import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Calendar, TrendingUp, ArrowLeft, ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useContent } from "@/hooks/useContent";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Projects() {
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showBefore, setShowBefore] = useState(true);
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

  const filteredProjects = filter === 'all' 
    ? c.projects.items 
    : c.projects.items.filter((p: any) => p.category === filter);

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
                <span className="text-[#1D71B8] font-semibold cursor-pointer border-b-2 border-[#1D71B8]">
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
                    className="block text-[#3C3C3B] hover:text-[#1D71B8] font-medium transition-colors cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {c.navigation[`services${lang}`]}
                  </span>
                </Link>
                <Link href="/projects">
                  <span
                    className="block text-[#1D71B8] font-semibold cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {c.navigation[`projects${lang}`]}
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
            {c.projects.hero[`title${lang}`]}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {c.projects.hero[`subtitle${lang}`]}
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-[#1D71B8] text-white shadow-lg'
                  : 'bg-white text-[#3C3C3B] border-2 border-gray-200 hover:border-[#1D71B8]'
              }`}
            >
              {c.projects.filter[`all${lang}`]}
            </button>
            <button
              onClick={() => setFilter('reforestation')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                filter === 'reforestation'
                  ? 'bg-[#1D71B8] text-white shadow-lg'
                  : 'bg-white text-[#3C3C3B] border-2 border-gray-200 hover:border-[#1D71B8]'
              }`}
            >
              {c.projects.filter[`reforestation${lang}`]}
            </button>
            <button
              onClick={() => setFilter('landscape')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                filter === 'landscape'
                  ? 'bg-[#95C11F] text-white shadow-lg'
                  : 'bg-white text-[#3C3C3B] border-2 border-gray-200 hover:border-[#95C11F]'
              }`}
            >
              {c.projects.filter[`landscape${lang}`]}
            </button>
            <button
              onClick={() => setFilter('irrigation')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                filter === 'irrigation'
                  ? 'bg-[#1D71B8] text-white shadow-lg'
                  : 'bg-white text-[#3C3C3B] border-2 border-gray-200 hover:border-[#1D71B8]'
              }`}
            >
              {c.projects.filter[`irrigation${lang}`]}
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: any) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="relative h-64 overflow-hidden group">
                  <img
                    src={project.image_after}
                    alt={project[`title${lang}`]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[#1D71B8]">
                    {project.year}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#3C3C3B] mb-2">
                    {project[`title${lang}`]}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{project[`location${lang}`]}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project[`description${lang}`]}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {project[`stats${lang}`].slice(0, 2).map((stat: string, idx: number) => (
                      <div key={idx} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-2 text-center">
                        <p className="text-xs font-semibold text-[#1D71B8]">{stat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const project = c.projects.items.find((p: any) => p.id === selectedProject);
              if (!project) return null;

              return (
                <div>
                  {/* Before/After Comparison */}
                  <div className="relative h-96 bg-gray-900">
                    <img
                      src={showBefore ? project.image_before : project.image_after}
                      alt={project[`title${lang}`]}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Toggle Button */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-xl p-2 flex items-center gap-2">
                      <button
                        onClick={() => setShowBefore(true)}
                        className={`px-4 py-2 rounded-full font-semibold transition-all ${
                          showBefore ? 'bg-[#1D71B8] text-white' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <ArrowLeft className="w-4 h-4 inline mr-1" />
                        {language === 'es' ? 'Antes' : 'Before'}
                      </button>
                      <button
                        onClick={() => setShowBefore(false)}
                        className={`px-4 py-2 rounded-full font-semibold transition-all ${
                          !showBefore ? 'bg-[#95C11F] text-white' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {language === 'es' ? 'Después' : 'After'}
                        <ArrowRight className="w-4 h-4 inline ml-1" />
                      </button>
                    </div>
                    
                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                    >
                      <X className="w-6 h-6 text-[#3C3C3B]" />
                    </button>
                  </div>

                  {/* Project Details */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-[#1D71B8] to-[#95C11F] text-white px-4 py-1 rounded-full text-sm font-semibold">
                        {project.year}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{project[`location${lang}`]}</span>
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold text-[#3C3C3B] mb-4">
                      {project[`title${lang}`]}
                    </h2>

                    <p className="text-lg text-gray-600 mb-8">
                      {project[`description${lang}`]}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-4 gap-4 mb-8">
                      {project[`stats${lang}`].map((stat: string, idx: number) => (
                        <div key={idx} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 text-center">
                          <TrendingUp className="w-6 h-6 text-[#1D71B8] mx-auto mb-2" />
                          <p className="font-semibold text-[#3C3C3B]">{stat}</p>
                        </div>
                      ))}
                    </div>

                    <Link href="/contact">
                      <button
                        className="w-full bg-[#1D71B8] hover:bg-[#155799] text-white font-semibold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        onClick={() => setSelectedProject(null)}
                      >
                        {language === 'es' ? 'Iniciar un Proyecto Similar' : 'Start a Similar Project'}
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1D71B8] to-[#95C11F]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {c.projects.cta[`title${lang}`]}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {c.projects.cta[`subtitle${lang}`]}
          </p>
          <Link href="/contact">
            <button className="bg-white hover:bg-gray-100 text-[#1D71B8] font-bold px-10 py-4 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl text-lg">
              {c.projects.cta[`button${lang}`]}
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
