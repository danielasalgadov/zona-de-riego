import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Eye, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminOrders() {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const { data: orders = [], refetch } = trpc.admin.getAllOrders.useQuery();
  const { data: orderDetails } = trpc.admin.getOrderDetails.useQuery(
    { orderId: selectedOrder! },
    { enabled: !!selectedOrder }
  );

  const updateStatusMutation = trpc.admin.updateOrderStatus.useMutation({
    onSuccess: () => {
      toast.success("Order status updated");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update status");
    },
  });

  const handleStatusChange = (orderId: number, status: string) => {
    updateStatusMutation.mutate({
      orderId,
      status: status as any,
    });
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const paymentStatusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    refunded: "bg-gray-100 text-gray-800",
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#3C3C3B]">Orders</h1>
          <p className="text-gray-600 mt-1">Manage customer orders and shipments</p>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No orders yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold">#{order.id}</td>
                      <td className="py-3 px-4">{order.customerName}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{order.customerEmail}</td>
                      <td className="py-3 px-4 font-semibold text-[#1D71B8]">
                        ${(order.totalAmount / 100).toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            paymentStatusColors[order.paymentStatus as keyof typeof paymentStatusColors]
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-xs font-semibold border-0 ${
                            statusColors[order.status as keyof typeof statusColors]
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => setSelectedOrder(order.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && orderDetails && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-[#3C3C3B]">
                Order #{selectedOrder}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-bold text-lg text-[#3C3C3B] mb-3">Customer Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><span className="font-semibold">Name:</span> {orderDetails.order?.customerName}</p>
                  <p><span className="font-semibold">Email:</span> {orderDetails.order?.customerEmail}</p>
                  <p><span className="font-semibold">Phone:</span> {orderDetails.order?.customerPhone}</p>
                  <p><span className="font-semibold">Address:</span> {orderDetails.order?.shippingAddress}</p>
                </div>
              </div>

              {/* Order Status */}
              <div>
                <h3 className="font-bold text-lg text-[#3C3C3B] mb-3">Order Status</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p>
                    <span className="font-semibold">Payment Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        paymentStatusColors[orderDetails.order?.paymentStatus as keyof typeof paymentStatusColors]
                      }`}
                    >
                      {orderDetails.order?.paymentStatus}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Order Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        statusColors[orderDetails.order?.status as keyof typeof statusColors]
                      }`}
                    >
                      {orderDetails.order?.status}
                    </span>
                  </p>
                  <p><span className="font-semibold">Order Date:</span> {new Date(orderDetails.order?.createdAt || "").toLocaleString()}</p>
                  {orderDetails.order?.mercadopagoId && (
                    <p><span className="font-semibold">MercadoPago ID:</span> {orderDetails.order.mercadopagoId}</p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-bold text-lg text-[#3C3C3B] mb-3">Order Items</h3>
                <div className="space-y-3">
                  {orderDetails.items?.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-[#3C3C3B]">{item.productName}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#1D71B8]">
                          ${(item.priceAtPurchase / 100).toFixed(2)} each
                        </p>
                        <p className="text-sm text-gray-600">
                          Total: ${((item.priceAtPurchase * item.quantity) / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="bg-[#1D71B8] text-white rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Order Total:</span>
                  <span className="text-2xl font-bold">
                    ${((orderDetails.order?.totalAmount || 0) / 100).toFixed(2)} MXN
                  </span>
                </div>
              </div>

              <Button
                onClick={() => setSelectedOrder(null)}
                className="w-full"
                variant="outline"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
