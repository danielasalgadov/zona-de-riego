import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const { data: products = [] } = trpc.shop.products.useQuery();
  const { data: orders = [] } = trpc.admin.getAllOrders.useQuery();

  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock < 10).length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.paymentStatus === 'pending').length;
  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'approved')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const stats = [
    {
      name: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "bg-blue-500",
      subtext: `${lowStockProducts} low stock`,
    },
    {
      name: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      color: "bg-green-500",
      subtext: `${pendingOrders} pending payment`,
    },
    {
      name: "Revenue",
      value: `$${(totalRevenue / 100).toFixed(2)}`,
      icon: DollarSign,
      color: "bg-purple-500",
      subtext: "MXN (paid orders)",
    },
    {
      name: "Conversion Rate",
      value: totalOrders > 0 ? `${((orders.filter(o => o.paymentStatus === 'approved').length / totalOrders) * 100).toFixed(1)}%` : "0%",
      icon: TrendingUp,
      color: "bg-orange-500",
      subtext: "Payment success rate",
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#3C3C3B]">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to your admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium">{stat.name}</h3>
                <p className="text-3xl font-bold text-[#3C3C3B] mt-2">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.subtext}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-[#3C3C3B] mb-4">Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">#{order.id}</td>
                      <td className="py-3 px-4">{order.customerName}</td>
                      <td className="py-3 px-4">${(order.totalAmount / 100).toFixed(2)} MXN</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.paymentStatus === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : order.paymentStatus === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'delivered'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Low Stock Alert */}
        {lowStockProducts > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-orange-800 mb-2">⚠️ Low Stock Alert</h3>
            <p className="text-orange-700">
              {lowStockProducts} product{lowStockProducts > 1 ? 's have' : ' has'} less than 10 items in stock.
              Consider restocking soon.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
