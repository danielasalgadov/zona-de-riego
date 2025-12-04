import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME } from "@shared/const";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  shop: router({ 
    products: publicProcedure.query(async () => {
      return await db.getAllProducts();
    }),
    
    productsByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await db.getProductsByCategory(input.category);
      }),
    
    cart: protectedProcedure.query(async ({ ctx }) => {
      const cartItems = await db.getCartItems(ctx.user.id);
      const cartWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await db.getProductById(item.productId);
          return { ...item, product };
        })
      );
      return cartWithProducts;
    }),
    
    addToCart: protectedProcedure
      .input(
        z.object({
          productId: z.number(),
          quantity: z.number().min(1).default(1),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.addToCart({
          userId: ctx.user.id,
          productId: input.productId,
          quantity: input.quantity,
        });
        return { success: true };
      }),
    
    updateCartItem: protectedProcedure
      .input(
        z.object({
          cartItemId: z.number(),
          quantity: z.number().min(1),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateCartItemQuantity(input.cartItemId, input.quantity);
        return { success: true };
      }),
    
    removeFromCart: protectedProcedure
      .input(z.object({ cartItemId: z.number() }))
      .mutation(async ({ input }) => {
        await db.removeFromCart(input.cartItemId);
        return { success: true };
      }),
    
    checkout: protectedProcedure
      .input(
        z.object({
          customerName: z.string().min(1),
          customerEmail: z.string().email(),
          customerPhone: z.string().min(1),
          shippingAddress: z.string().min(10),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Get cart items
        const cartItems = await db.getCartItems(ctx.user.id);
        if (cartItems.length === 0) {
          throw new Error("Cart is empty");
        }
        
        // Calculate total and prepare order items
        let totalAmount = 0;
        const orderItemsData = await Promise.all(
          cartItems.map(async (item) => {
            const product = await db.getProductById(item.productId);
            if (!product) throw new Error(`Product ${item.productId} not found`);
            totalAmount += product.price * item.quantity;
            return {
              productId: product.id,
              productName: product.name,
              quantity: item.quantity,
              priceAtPurchase: product.price,
            };
          })
        );
        
        // Create order
        const orderId = await db.createOrder(
          {
            userId: ctx.user.id,
            customerName: input.customerName,
            customerEmail: input.customerEmail,
            customerPhone: input.customerPhone,
            shippingAddress: input.shippingAddress,
            totalAmount,
            status: "pending" as const,
            paymentStatus: "pending" as const,
          },
          orderItemsData as any
        );
        
        // Create MercadoPago payment preference
        const { createPaymentPreference } = await import('./mercadopago');
        const { preferenceId, initPoint, sandboxInitPoint } = await createPaymentPreference({
          orderId,
          items: orderItemsData.map(item => ({
            title: item.productName,
            quantity: item.quantity,
            unit_price: item.priceAtPurchase / 100, // Convert cents to MXN
          })),
          payer: {
            name: input.customerName,
            email: input.customerEmail,
            phone: input.customerPhone,
          },
        });
        
        // Update order with MercadoPago preference ID
        await db.updateOrderPayment(orderId, preferenceId);
        
        // Clear cart
        await db.clearCart(ctx.user.id);
        
        // Notify owner
        await notifyOwner({
          title: `New Order #${orderId} from ${input.customerName}`,
          content: `
Customer: ${input.customerName}
Email: ${input.customerEmail}
Phone: ${input.customerPhone}
Address: ${input.shippingAddress}
Total: $${(totalAmount / 100).toFixed(2)} MXN

Items:
${orderItemsData.map(item => `- ${item.productName} x${item.quantity} @ $${(item.priceAtPurchase / 100).toFixed(2)}`).join('\n')}

Payment: Pending (MercadoPago)
          `,
        });
        
        return { 
          success: true, 
          orderId,
          paymentUrl: sandboxInitPoint || initPoint, // Use sandbox in dev
          preferenceId,
        };
      }),
  }),

  admin: router({
    // Product management
    createProduct: protectedProcedure
      .input(
        z.object({
          name: z.string().min(1),
          description: z.string().optional(),
          price: z.number().min(0), // Price in cents
          category: z.enum(['plants', 'seeds', 'tools', 'irrigation']),
          stock: z.number().min(0).default(0),
          imageUrl: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const productId = await db.createProduct(input as any);
        return { success: true, productId };
      }),

    updateProduct: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().min(1).optional(),
          description: z.string().optional(),
          price: z.number().min(0).optional(),
          category: z.enum(['plants', 'seeds', 'tools', 'irrigation']).optional(),
          stock: z.number().min(0).optional(),
          imageUrl: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        await db.updateProduct(id, updates as any);
        return { success: true };
      }),

    deleteProduct: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteProduct(input.id);
        return { success: true };
      }),

    // Order management
    getAllOrders: protectedProcedure.query(async () => {
      return await db.getAllOrders();
    }),

    getOrderDetails: protectedProcedure
      .input(z.object({ orderId: z.number() }))
      .query(async ({ input }) => {
        const order = await db.getOrderById(input.orderId);
        const items = await db.getOrderItems(input.orderId);
        return { order, items };
      }),

    updateOrderStatus: protectedProcedure
      .input(
        z.object({
          orderId: z.number(),
          status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateOrderStatus(input.orderId, input.status);
        return { success: true };
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Invalid email address"),
          phone: z.string().optional(),
          inquiryType: z.string().min(1, "Inquiry type is required"),
          message: z.string().min(10, "Message must be at least 10 characters"),
        })
      )
      .mutation(async ({ input }) => {
        // Send notification to owner
        const notificationTitle = `New Contact Form Submission from ${input.name}`;
        const notificationContent = `
Name: ${input.name}
Email: ${input.email}
Phone: ${input.phone || 'Not provided'}
Inquiry Type: ${input.inquiryType}

Message:
${input.message}
        `;

        const success = await notifyOwner({
          title: notificationTitle,
          content: notificationContent,
        });

        if (!success) {
          console.error('Failed to send notification');
          // Still return success to user even if notification fails
        }

        return {
          success: true,
          message: "Contact form submitted successfully",
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
