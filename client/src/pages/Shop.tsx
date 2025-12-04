import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShoppingCart, Search, Menu, X, Plus, Minus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useContent } from "@/hooks/useContent";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";

export default function Shop() {
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { content, loading } = useContent();
  const { user } = useAuth();
  
  const { data: products = [] } = trpc.shop.products.useQuery();
  const { data: cart = [], refetch: refetchCart } = trpc.shop.cart.useQuery(undefined, {
    enabled: !!user,
  });
  
  const addToCartMutation = trpc.shop.addToCart.useMutation({
    onSuccess: () => {
      toast.success(language === 'es' ? 'Producto agregado al carrito' : 'Product added to cart');
      refetchCart();
    },
  });
  
  const updateCartMutation = trpc.shop.updateCartItem.useMutation({
    onSuccess: () => refetchCart(),
  });
  
  const removeFromCartMutation = trpc.shop.removeFromCart.useMutation({
    onSuccess: () => {
      toast.success(language === 'es' ? 'Producto eliminado' : 'Product removed');
      refetchCart();
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
  
  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);
  
  const handleAddToCart = (productId: number) => {
    if (!user) {
      toast.error(language === 'es' ? 'Inicia sesión para agregar al carrito' : 'Please log in to add to cart');
      window.location.href = getLoginUrl();
      return;
    }
    addToCartMutation.mutate({ productId, quantity: 1 });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img src={c.site.logo} alt={c.site.name} className="h-12 w-auto" />
              </div>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/services">
                <span className="text-[#3C3C3B] hover:text-[#1D71B8] font-medium transition-colors cursor-pointer">
                  {c.navigation[`services${lang}`]}
                </span>
              </Link>
              <Link href="/projects">
                <span className="text-[#3C3C3B] hover:text-[#1D71B8] font-medium transition-colors cursor-pointer">
                  {c.navigation[`projects${lang}`]}
                </span>
              </Link>
              <Link href="/shop">
                <span className="text-[#1D71B8] font-semibold cursor-pointer border-b-2 border-[#1D71B8]">
                  {c.navigation[`shop${lang}`]}
                </span>
              </Link>
              <Link href="/contact">
                <span className="text-[#3C3C3B] hover:text-[#1D71B8] font-medium transition-colors cursor-pointer">
                  {c.navigation[`contact${lang}`]}
                </span>
              </Link>
              
              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative p-2 text-[#3C3C3B] hover:text-[#1D71B8] transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#95C11F] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#3C3C3B] hover:text-[#1D71B8]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col gap-4 pt-4">
                <Link href="/services">
                  <span className="block text-[#3C3C3B] hover:text-[#1D71B8] font-medium transition-colors cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                    {c.navigation[`services${lang}`]}
                  </span>
                </Link>
                <Link href="/projects">
                  <span className="block text-[#3C3C3B] hover:text-[#1D71B8] font-medium transition-colors cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                    {c.navigation[`projects${lang}`]}
                  </span>
                </Link>
                <Link href="/shop">
                  <span className="block text-[#1D71B8] font-semibold cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                    {c.navigation[`shop${lang}`]}
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="block text-[#3C3C3B] hover:text-[#1D71B8] font-medium transition-colors cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                    {c.navigation[`contact${lang}`]}
                  </span>
                </Link>
                <button
                  onClick={() => { setCartOpen(true); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 text-[#3C3C3B] hover:text-[#1D71B8] font-medium"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {c.shop.cart[`title${lang}`]} ({cart.length})
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#3C3C3B] mb-6">
            {c.shop.hero[`title${lang}`]}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {c.shop.hero[`subtitle${lang}`]}
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {['all', 'plants', 'seeds', 'tools', 'irrigation'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#1D71B8] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {c.shop.categories[`${category}${lang}`]}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'es' ? 'Buscar productos...' : 'Search products...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D71B8]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {language === 'es' ? 'No se encontraron productos' : 'No products found'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={product.imageUrl || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                          {c.shop.product[`out_of_stock${lang}`]}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-[#3C3C3B] mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#1D71B8]">
                        ${(product.price / 100).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">MXN</span>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock === 0 || addToCartMutation.isPending}
                      className="w-full mt-4 bg-[#95C11F] hover:bg-[#7da519] text-white font-semibold py-2 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {c.shop.product[`add_to_cart${lang}`]}
                    </button>
                    
                    {product.stock > 0 && product.stock < 10 && (
                      <p className="text-xs text-orange-600 mt-2 text-center">
                        {language === 'es' ? `Solo ${product.stock} disponibles` : `Only ${product.stock} left`}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)}></div>
          
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-[#3C3C3B]">
                {c.shop.cart[`title${lang}`]}
              </h2>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">{c.shop.cart[`empty${lang}`]}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.product?.imageUrl || '/placeholder-product.jpg'}
                        alt={item.product?.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#3C3C3B] mb-1">
                          {item.product?.name}
                        </h3>
                        <p className="text-[#1D71B8] font-bold mb-2">
                          ${((item.product?.price || 0) / 100).toFixed(2)} MXN
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateCartMutation.mutate({ cartItemId: item.id, quantity: item.quantity - 1 });
                              }
                            }}
                            className="p-1 bg-white rounded hover:bg-gray-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateCartMutation.mutate({ cartItemId: item.id, quantity: item.quantity + 1 })}
                            className="p-1 bg-white rounded hover:bg-gray-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCartMutation.mutate({ cartItemId: item.id })}
                            className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>{c.shop.cart[`subtotal${lang}`]}:</span>
                  <span className="text-[#1D71B8]">${(cartTotal / 100).toFixed(2)} MXN</span>
                </div>
                
                <Link href="/checkout">
                  <Button className="w-full bg-[#1D71B8] hover:bg-[#155799] text-white font-bold py-3 rounded-lg">
                    {c.shop.cart[`checkout${lang}`]}
                  </Button>
                </Link>
                
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-[#3C3C3B] font-medium py-2"
                >
                  {c.shop.cart[`continue_shopping${lang}`]}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#3C3C3B] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src={c.site.logo} alt={c.site.name} className="h-16 w-auto mb-4 brightness-0 invert" />
              <p className="text-gray-400 text-sm">
                {c.footer[`tagline${lang}`]}
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">{c.footer[`company_title${lang}`]}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/"><span className="hover:text-white transition-colors cursor-pointer">{c.navigation[`home${lang}`]}</span></Link></li>
                <li><Link href="/services"><span className="hover:text-white transition-colors cursor-pointer">{c.navigation[`services${lang}`]}</span></Link></li>
                <li><Link href="/projects"><span className="hover:text-white transition-colors cursor-pointer">{c.navigation[`projects${lang}`]}</span></Link></li>
                <li><Link href="/shop"><span className="hover:text-white transition-colors cursor-pointer">{c.navigation[`shop${lang}`]}</span></Link></li>
                <li><Link href="/contact"><span className="hover:text-white transition-colors cursor-pointer">{c.navigation[`contact${lang}`]}</span></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">{c.footer[`contact_title${lang}`]}</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>{c.site.contact[`location${lang}`]}</li>
                <li>{c.site.contact.email}</li>
                <li>{c.site.contact.phone}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 {c.site.name}. {c.footer[`copyright${lang}`]}</p>
          </div>
        </div>
      </footer>
      
      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}
