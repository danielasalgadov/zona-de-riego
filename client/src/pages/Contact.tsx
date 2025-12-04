import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, MapPin, Phone, Send, Clock, Menu, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useContent } from "@/hooks/useContent";
import { trpc } from "@/lib/trpc";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Contact() {
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
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

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success(c.contact.form[`success_message${lang}`]);
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send message. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
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
              <Link href="/contact">
                <span className="text-[#1D71B8] font-semibold cursor-pointer border-b-2 border-[#1D71B8]">
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
                <Link href="/contact">
                  <span
                    className="block text-[#1D71B8] font-semibold cursor-pointer"
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
            {c.contact.hero[`title${lang}`]}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {c.contact.hero[`subtitle${lang}`]}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
                <h2 className="text-3xl font-bold text-[#3C3C3B] mb-2">
                  {c.contact.form[`title${lang}`]}
                </h2>
                <p className="text-gray-600 mb-8">
                  {c.contact.form[`subtitle${lang}`]}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#3C3C3B] font-semibold">
                      {c.contact.form[`name_label${lang}`]} *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder={c.contact.form[`name_placeholder${lang}`]}
                      className="border-gray-300 focus:border-[#1D71B8] focus:ring-[#1D71B8]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#3C3C3B] font-semibold">
                      {c.contact.form[`email_label${lang}`]} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder={c.contact.form[`email_placeholder${lang}`]}
                      className="border-gray-300 focus:border-[#1D71B8] focus:ring-[#1D71B8]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#3C3C3B] font-semibold">
                      {c.contact.form[`phone_label${lang}`]}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={c.contact.form[`phone_placeholder${lang}`]}
                      className="border-gray-300 focus:border-[#1D71B8] focus:ring-[#1D71B8]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiryType" className="text-[#3C3C3B] font-semibold">
                      {c.contact.form[`inquiry_label${lang}`]} *
                    </Label>
                    <Select
                      value={formData.inquiryType}
                      onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                      required
                    >
                      <SelectTrigger className="border-gray-300 focus:border-[#1D71B8] focus:ring-[#1D71B8]">
                        <SelectValue placeholder={c.contact.form[`inquiry_placeholder${lang}`]} />
                      </SelectTrigger>
                      <SelectContent>
                        {c.contact.form[`inquiry_options${lang}`].map((option: string, idx: number) => (
                          <SelectItem key={idx} value={option.toLowerCase().replace(/\s+/g, '-')}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#3C3C3B] font-semibold">
                      {c.contact.form[`message_label${lang}`]} *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      placeholder={c.contact.form[`message_placeholder${lang}`]}
                      rows={5}
                      className="border-gray-300 focus:border-[#1D71B8] focus:ring-[#1D71B8]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#1D71B8] hover:bg-[#155799] text-white font-semibold py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {c.contact.form[`submit_button${lang}`]}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="bg-gradient-to-br from-[#1D71B8] to-[#95C11F] rounded-2xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">
                  {c.contact.info[`title${lang}`]}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        {c.contact.info[`location_label${lang}`]}
                      </h4>
                      <p className="text-white/90">
                        {c.site.contact[`location${lang}`]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        {c.contact.info[`email_label${lang}`]}
                      </h4>
                      <p className="text-white/90">{c.site.contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        {c.contact.info[`phone_label${lang}`]}
                      </h4>
                      <p className="text-white/90">{c.site.contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        {c.contact.info[`hours_label${lang}`]}
                      </h4>
                      <p className="text-white/90">
                        {c.contact.info[`hours_weekday${lang}`]}
                      </p>
                      <p className="text-white/90">
                        {c.contact.info[`hours_saturday${lang}`]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-[#3C3C3B] mb-4">
                  {c.contact.why_choose[`title${lang}`]}
                </h3>
                <ul className="space-y-3 text-gray-600">
                  {c.contact.why_choose[`reasons${lang}`].map((reason: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#95C11F] mt-2 flex-shrink-0"></div>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
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
