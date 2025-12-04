import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Droplet, Leaf, Users, ArrowRight, CheckCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import { useContent } from "@/hooks/useContent";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  const { language } = useLanguage();
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
                <span className="text-[#3C3C3B] hover:text-[#1D71B8] font-medium transition-colors cursor-pointer">
                  {c.navigation[`shop${lang}`]}
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
                    className="block text-[#3C3C3B] hover:text-[#1D71B8] font-medium transition-colors cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {c.navigation[`services${lang}`]}
                  </span>
                </Link>
                <Link href="/projects">
                  <span
                    className="block text-[#3C3C3B] hover:text-[#1D71B8] font-medium transition-colors cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {c.navigation[`projects${lang}`]}
                  </span>
                </Link>
                <Link href="/shop">
                  <span
                    className="block text-[#3C3C3B] hover:text-[#1D71B8] font-medium transition-colors cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {c.navigation[`shop${lang}`]}
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
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#3C3C3B] leading-tight mb-6">
                {language === 'es' ? (
                  <>Soluciones Ambientales <span className="text-[#1D71B8]">Integrales</span></>
                ) : (
                  <>Integrated <span className="text-[#1D71B8]">Environmental</span> Solutions</>
                )}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {c.home.hero[`subtitle${lang}`]}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/services">
                  <button className="bg-[#1D71B8] hover:bg-[#155799] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                    {c.home.hero[`cta_primary${lang}`]}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="bg-white hover:bg-gray-50 text-[#1D71B8] font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#1D71B8]">
                    {c.home.hero[`cta_secondary${lang}`]}
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#1D71B8] to-[#95C11F] p-1">
                <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                  <img src={c.site.logo} alt={c.site.name} className="w-3/4 h-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3C3C3B] mb-4">
              {c.home.services_section[`title${lang}`]}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {c.home.services_section[`subtitle${lang}`]}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Reforestation Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1D71B8] to-[#95C11F] flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#3C3C3B] mb-4">
                {c.services.reforestation[`title${lang}`]}
              </h3>
              <p className="text-gray-600 mb-6">
                {c.services.reforestation[`description${lang}`]}
              </p>
              <ul className="space-y-3 mb-6">
                {c.services.reforestation[`services_included${lang}`].slice(0, 3).map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#95C11F] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services">
                <button className="text-[#1D71B8] font-semibold hover:underline flex items-center gap-2">
                  {language === 'es' ? 'Conocer más' : 'Learn more'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Landscape Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#95C11F] to-[#1D71B8] flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#3C3C3B] mb-4">
                {c.services.landscape[`title${lang}`]}
              </h3>
              <p className="text-gray-600 mb-6">
                {c.services.landscape[`description${lang}`]}
              </p>
              <ul className="space-y-3 mb-6">
                {c.services.landscape[`services_included${lang}`].slice(0, 3).map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#95C11F] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services">
                <button className="text-[#1D71B8] font-semibold hover:underline flex items-center gap-2">
                  {language === 'es' ? 'Conocer más' : 'Learn more'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Irrigation Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1D71B8] to-[#95C11F] flex items-center justify-center mb-6">
                <Droplet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#3C3C3B] mb-4">
                {c.services.irrigation[`title${lang}`]}
              </h3>
              <p className="text-gray-600 mb-6">
                {c.services.irrigation[`description${lang}`]}
              </p>
              <ul className="space-y-3 mb-6">
                {c.services.irrigation[`services_included${lang}`].slice(0, 3).map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#95C11F] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services">
                <button className="text-[#1D71B8] font-semibold hover:underline flex items-center gap-2">
                  {language === 'es' ? 'Conocer más' : 'Learn more'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1D71B8] to-[#95C11F]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {c.home.cta_section[`title${lang}`]}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {c.home.cta_section[`subtitle${lang}`]}
          </p>
          <Link href="/contact">
            <button className="bg-white hover:bg-gray-100 text-[#1D71B8] font-bold px-10 py-4 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl text-lg">
              {c.home.cta_section[`button${lang}`]}
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
                <li><Link href="/projects"><span className="hover:text-white transition-colors cursor-pointer">{c.navigation[`projects${lang}`]}</span></Link></li>
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
