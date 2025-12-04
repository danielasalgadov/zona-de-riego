import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Leaf, Droplet, Users, CheckCircle, ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useContent } from "@/hooks/useContent";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Services() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'reforestation' | 'landscape' | 'irrigation'>('reforestation');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { content, loading } = useContent();

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
                <span className="text-[#1D71B8] font-semibold cursor-pointer border-b-2 border-[#1D71B8]">
                  {c.navigation[`services${lang}`]}
                </span>
              </Link>
              <Link href="/projects">
                <span className="text-[#3C3C3B] hover:text-[#1D71B8] font-medium transition-colors cursor-pointer">
                  {c.navigation[`projects${lang}`]}
                </span>
              </Link>
              <Link href="/contact">
                <span className="text-[#3C3C3B] hover:text-[#1D71B8] font-medium transition-colors cursor-pointer">
                  {c.navigation[`contact${lang}`]}
                </span>
              </Link>
              <Link href="/contact">
                <button className="bg-[#1D71B8] hover:bg-[#155799] text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                  {c.navigation[`contact_button${lang}`]}
                </button>
              </Link>
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
                  <span
                    className="block text-[#1D71B8] font-semibold cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {c.navigation[`services${lang}`]}
                  </span>
                </Link>
                <Link href="/contact">
                  <span
                    className="block text-[#3C3C3B] hover:text-[#1D71B8] font-medium transition-colors cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {c.navigation[`contact${lang}`]}
                  </span>
                </Link>
                <Link href="/contact">
                  <button
                    className="bg-[#1D71B8] hover:bg-[#155799] text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {c.navigation[`contact_button${lang}`]}
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#3C3C3B] mb-6">
            {c.services.hero[`title${lang}`]}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {c.services.hero[`subtitle${lang}`]}
          </p>
        </div>
      </section>

      {/* Service Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('reforestation')}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'reforestation'
                  ? 'bg-[#1D71B8] text-white shadow-lg'
                  : 'bg-white text-[#3C3C3B] border-2 border-gray-200 hover:border-[#1D71B8]'
              }`}
            >
              <Leaf className="w-5 h-5" />
              {c.services.reforestation[`name${lang}`]}
            </button>
            <button
              onClick={() => setActiveTab('landscape')}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'landscape'
                  ? 'bg-[#95C11F] text-white shadow-lg'
                  : 'bg-white text-[#3C3C3B] border-2 border-gray-200 hover:border-[#95C11F]'
              }`}
            >
              <Users className="w-5 h-5" />
              {c.services.landscape[`name${lang}`]}
            </button>
            <button
              onClick={() => setActiveTab('irrigation')}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'irrigation'
                  ? 'bg-[#1D71B8] text-white shadow-lg'
                  : 'bg-white text-[#3C3C3B] border-2 border-gray-200 hover:border-[#1D71B8]'
              }`}
            >
              <Droplet className="w-5 h-5" />
              {c.services.irrigation[`name${lang}`]}
            </button>
          </div>

          {/* Reforestation Tab */}
          {activeTab === 'reforestation' && (
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1D71B8] to-[#95C11F] flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#3C3C3B]">
                    {c.services.reforestation[`title${lang}`]}
                  </h2>
                </div>
                
                <p className="text-lg text-gray-600 mb-8">
                  {c.services.reforestation[`description${lang}`]}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-[#3C3C3B] mb-4">
                      {language === 'es' ? 'Servicios Incluidos' : 'Services Included'}
                    </h3>
                    <ul className="space-y-3">
                      {c.services.reforestation[`services_included${lang}`].map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#95C11F] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#3C3C3B] mb-4">
                      {language === 'es' ? 'Ideal Para' : 'Ideal For'}
                    </h3>
                    <ul className="space-y-3">
                      {c.services.reforestation[`ideal_for${lang}`].map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <ArrowRight className="w-5 h-5 text-[#1D71B8] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href="/contact">
                  <button className="bg-[#1D71B8] hover:bg-[#155799] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
                    {c.services[`quote_button${lang}`]}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Landscape Tab */}
          {activeTab === 'landscape' && (
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#95C11F] to-[#1D71B8] flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#3C3C3B]">
                    {c.services.landscape[`title${lang}`]}
                  </h2>
                </div>
                
                <p className="text-lg text-gray-600 mb-8">
                  {c.services.landscape[`description${lang}`]}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-[#3C3C3B] mb-4">
                      {language === 'es' ? 'Servicios Incluidos' : 'Services Included'}
                    </h3>
                    <ul className="space-y-3">
                      {c.services.landscape[`services_included${lang}`].map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#95C11F] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#3C3C3B] mb-4">
                      {language === 'es' ? 'Ideal Para' : 'Ideal For'}
                    </h3>
                    <ul className="space-y-3">
                      {c.services.landscape[`ideal_for${lang}`].map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <ArrowRight className="w-5 h-5 text-[#1D71B8] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href="/contact">
                  <button className="bg-[#95C11F] hover:bg-[#7da519] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
                    {c.services[`quote_button${lang}`]}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Irrigation Tab */}
          {activeTab === 'irrigation' && (
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1D71B8] to-[#95C11F] flex items-center justify-center">
                    <Droplet className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#3C3C3B]">
                    {c.services.irrigation[`title${lang}`]}
                  </h2>
                </div>
                
                <p className="text-lg text-gray-600 mb-8">
                  {c.services.irrigation[`description${lang}`]}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-[#3C3C3B] mb-4">
                      {language === 'es' ? 'Servicios Incluidos' : 'Services Included'}
                    </h3>
                    <ul className="space-y-3">
                      {c.services.irrigation[`services_included${lang}`].map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#95C11F] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#3C3C3B] mb-4">
                      {language === 'es' ? 'Ideal Para' : 'Ideal For'}
                    </h3>
                    <ul className="space-y-3">
                      {c.services.irrigation[`ideal_for${lang}`].map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <ArrowRight className="w-5 h-5 text-[#1D71B8] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href="/contact">
                  <button className="bg-[#1D71B8] hover:bg-[#155799] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
                    {c.services[`quote_button${lang}`]}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1D71B8] to-[#95C11F]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {c.services.cta[`title${lang}`]}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {c.services.cta[`subtitle${lang}`]}
          </p>
          <Link href="/contact">
            <button className="bg-white hover:bg-gray-100 text-[#1D71B8] font-bold px-10 py-4 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl text-lg">
              {c.services.cta[`button${lang}`]}
            </button>
          </Link>
        </div>
      </section>

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
              <h3 className="font-bold text-lg mb-4">{c.footer[`services_title${lang}`]}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><span className="hover:text-white transition-colors cursor-pointer">{c.services.reforestation[`name${lang}`]}</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">{c.services.landscape[`name${lang}`]}</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">{c.services.irrigation[`name${lang}`]}</span></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">{c.footer[`company_title${lang}`]}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/"><span className="hover:text-white transition-colors cursor-pointer">{c.navigation[`home${lang}`]}</span></Link></li>
                <li><Link href="/services"><span className="hover:text-white transition-colors cursor-pointer">{c.navigation[`services${lang}`]}</span></Link></li>
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
