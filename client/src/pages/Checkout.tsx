import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useContent } from "@/hooks/useContent";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function Checkout() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const { content, loading } = useContent();
  const { user } = useAuth({ redirectOnUnauthenticated: true });
  
  const { data: cart = [] } = trpc.shop.cart.useQuery();
  
  const [formData, setFormData] = useState({
    customerName: user?.name || "",
    customerEmail: user?.email || "",
    customerPhone: "",
    shippingAddress: "",
  });
  
  const checkoutMutation = trpc.shop.checkout.useMutation({
    onSuccess: (data) => {
      // Redirect to MercadoPago payment page
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        setOrderId(data.orderId);
        setOrderPlaced(true);
        toast.success(language === 'es' ? '¡Pedido realizado con éxito!' : 'Order placed successfully!');
      }
    },
    onError: (error) => {
      toast.error(error.message || (language === 'es' ? 'Error al procesar el pedido' : 'Error processing order'));
    },
  });

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1D71B8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const c = content;
  const lang = language === 'es' ? '_es' : '_en';
  
  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error(language === 'es' ? 'Tu carrito está vacío' : 'Your cart is empty');
      return;
    }
    checkoutMutation.mutate(formData);
  };
  
  // Order confirmation view
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
          <div className="mb-6">
            <CheckCircle className="w-24 h-24 text-[#95C11F] mx-auto" />
          </div>
          
          <h1 className="text-4xl font-bold text-[#3C3C3B] mb-4">
            {c.shop.checkout[`success_title${lang}`]}
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            {c.shop.checkout[`success_message${lang}`]}
          </p>
          
          <p className="text-gray-500 mb-8">
            {language === 'es' ? `Número de pedido: #${orderId}` : `Order number: #${orderId}`}
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-lg text-[#3C3C3B] mb-4">
              {c.shop.checkout[`order_summary${lang}`]}
            </h2>
            <div className="space-y-2 text-left">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-700">
                    {item.product?.name} x{item.quantity}
                  </span>
                  <span className="font-semibold text-[#1D71B8]">
                    ${((item.product?.price || 0) * item.quantity / 100).toFixed(2)} MXN
                  </span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                <span>{c.shop.checkout[`total${lang}`]}:</span>
                <span className="text-[#1D71B8]">${(cartTotal / 100).toFixed(2)} MXN</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button className="bg-[#1D71B8] hover:bg-[#155799] text-white px-8 py-3">
                {language === 'es' ? 'Seguir Comprando' : 'Continue Shopping'}
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="px-8 py-3">
                {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Checkout form view
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#3C3C3B] mb-8">
            {c.shop.checkout[`title${lang}`]}
          </h1>
          
          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg mb-6">
                {language === 'es' ? 'Tu carrito está vacío' : 'Your cart is empty'}
              </p>
              <Link href="/shop">
                <Button className="bg-[#1D71B8] hover:bg-[#155799] text-white">
                  {language === 'es' ? 'Ir a la Tienda' : 'Go to Shop'}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Customer Form */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#3C3C3B] mb-6">
                  {c.shop.checkout[`customer_info${lang}`]}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {c.shop.checkout[`name${lang}`]} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D71B8]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {c.shop.checkout[`email${lang}`]} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D71B8]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {c.shop.checkout[`phone${lang}`]} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      placeholder="+52 999 XXX-XXXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D71B8]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {c.shop.checkout[`address${lang}`]} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.shippingAddress}
                      onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                      placeholder={language === 'es' ? 'Calle, número, colonia, ciudad, estado, código postal' : 'Street, number, neighborhood, city, state, postal code'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D71B8]"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={checkoutMutation.isPending}
                    className="w-full bg-[#95C11F] hover:bg-[#7da519] text-white font-bold py-3 rounded-lg"
                  >
                    {checkoutMutation.isPending
                      ? (language === 'es' ? 'Procesando...' : 'Processing...')
                      : c.shop.checkout[`place_order${lang}`]
                    }
                  </Button>
                </form>
              </div>
              
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#3C3C3B] mb-6">
                  {c.shop.checkout[`order_summary${lang}`]}
                </h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b">
                      <img
                        src={item.product?.imageUrl || '/placeholder-product.jpg'}
                        alt={item.product?.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#3C3C3B]">
                          {item.product?.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {language === 'es' ? 'Cantidad' : 'Quantity'}: {item.quantity}
                        </p>
                        <p className="text-[#1D71B8] font-bold mt-1">
                          ${((item.product?.price || 0) * item.quantity / 100).toFixed(2)} MXN
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="font-semibold">${(cartTotal / 100).toFixed(2)} MXN</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">
                      {language === 'es' ? 'Envío' : 'Shipping'}:
                    </span>
                    <span className="font-semibold text-[#95C11F]">
                      {language === 'es' ? 'A calcular' : 'TBD'}
                    </span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold border-t pt-4">
                    <span>{c.shop.checkout[`total${lang}`]}:</span>
                    <span className="text-[#1D71B8]">${(cartTotal / 100).toFixed(2)} MXN</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {language === 'es'
                      ? '📦 Nos pondremos en contacto contigo para coordinar la entrega y calcular el costo de envío según tu ubicación.'
                      : '📦 We will contact you to coordinate delivery and calculate shipping cost based on your location.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
