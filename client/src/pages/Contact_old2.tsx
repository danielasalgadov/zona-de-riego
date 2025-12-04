import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('contact.form.successMessage'));
    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Zona de Riego</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.services')}
            </Link>
            <Link href="/projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.projects')}
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.about')}
            </Link>
            <LanguageSwitcher />
            <Link href="/contact">
              <Button>{t('nav.contact')}</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              {t('contact.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('contact.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('contact.form.title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('contact.form.nameLabel')} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('contact.form.emailLabel')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t('contact.form.phoneLabel')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t('contact.form.phonePlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiryType">{t('contact.form.inquiryLabel')} *</Label>
                  <Select
                    value={formData.inquiryType}
                    onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('contact.form.inquiryPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="developer">{t('contact.form.inquiryDeveloper')}</SelectItem>
                      <SelectItem value="residential">{t('contact.form.inquiryResidential')}</SelectItem>
                      <SelectItem value="event">{t('contact.form.inquiryEvent')}</SelectItem>
                      <SelectItem value="irrigation">{t('contact.form.inquiryIrrigation')}</SelectItem>
                      <SelectItem value="general">{t('contact.form.inquiryGeneral')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('contact.form.messageLabel')} *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={6}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  {t('contact.form.submitButton')}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h2>
                <p className="text-muted-foreground mb-8">
                  {t('contact.info.description')}
                </p>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{t('contact.info.locationTitle')}</h3>
                          <p className="text-sm text-muted-foreground">
                            {t('contact.info.locationText')}
                            <br />
                            {t('contact.info.locationSubtext')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{t('contact.info.emailTitle')}</h3>
                          <p className="text-sm text-muted-foreground">
                            info@zonaderiego.mx
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{t('contact.info.phoneTitle')}</h3>
                          <p className="text-sm text-muted-foreground">
                            +52 (999) XXX-XXXX
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">{t('contact.info.hoursTitle')}</h3>
                  <div className="space-y-1 text-sm opacity-90">
                    <p>{t('contact.info.hoursMF')}</p>
                    <p>{t('contact.info.hoursSat')}</p>
                    <p>{t('contact.info.hoursSun')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('contact.areas.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('contact.areas.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold text-lg mb-2">{t('contact.areas.yucatan')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('contact.areas.yucatanDesc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold text-lg mb-2">{t('contact.areas.quintanaRoo')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('contact.areas.quintanaRooDesc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold text-lg mb-2">{t('contact.areas.campeche')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('contact.areas.campecheDesc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/30 border-t border-border">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Zona de Riego</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.servicesTitle')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/services" className="hover:text-foreground transition-colors">{t('home.services.reforestation.title')}</Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-foreground transition-colors">{t('home.services.landscape.title')}</Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-foreground transition-colors">{t('home.services.irrigation.title')}</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.companyTitle')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">{t('nav.about')}</Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-foreground transition-colors">{t('nav.projects')}</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">{t('nav.contact')}</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.contactTitle')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t('footer.location')}</li>
                <li>info@zonaderiego.mx</li>
                <li>+52 (999) XXX-XXXX</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

