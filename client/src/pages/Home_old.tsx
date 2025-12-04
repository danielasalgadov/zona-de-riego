import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Building2, Home as HomeIcon, PartyPopper, Leaf, Droplets, TreeDeciduous } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { t } = useLanguage();

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
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
        <div className="container relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              {t('home.hero.title')}{" "}
              <span className="text-primary">{t('home.hero.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  {t('home.hero.ctaPrimary')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {t('home.hero.ctaSecondary')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('home.services.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.services.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TreeDeciduous className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.services.reforestation.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('home.services.reforestation.description')}
                </p>
                <Link href="/services" className="text-primary font-medium inline-flex items-center hover:underline">
                  {t('home.services.reforestation.cta')}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.services.landscape.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('home.services.landscape.description')}
                </p>
                <Link href="/services" className="text-primary font-medium inline-flex items-center hover:underline">
                  {t('home.services.landscape.cta')}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Droplets className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('home.services.irrigation.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('home.services.irrigation.description')}
                </p>
                <Link href="/services" className="text-primary font-medium inline-flex items-center hover:underline">
                  {t('home.services.irrigation.cta')}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('home.audiences.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.audiences.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('home.audiences.developers.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('home.audiences.developers.description')}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-sm">
                    <span className="text-primary mr-2">✓</span>
                    <span>{t('home.audiences.developers.feature1')}</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-primary mr-2">✓</span>
                    <span>{t('home.audiences.developers.feature2')}</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-primary mr-2">✓</span>
                    <span>{t('home.audiences.developers.feature3')}</span>
                  </li>
                </ul>
                <Link href="/services">
                  <Button variant="outline" className="w-full">
                    {t('home.audiences.developers.cta')}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <HomeIcon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('home.audiences.individuals.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('home.audiences.individuals.description')}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-sm">
                    <span className="text-secondary mr-2">✓</span>
                    <span>{t('home.audiences.individuals.feature1')}</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-secondary mr-2">✓</span>
                    <span>{t('home.audiences.individuals.feature2')}</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-secondary mr-2">✓</span>
                    <span>{t('home.audiences.individuals.feature3')}</span>
                  </li>
                </ul>
                <Link href="/services">
                  <Button variant="outline" className="w-full">
                    {t('home.audiences.individuals.cta')}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <PartyPopper className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('home.audiences.events.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('home.audiences.events.description')}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>{t('home.audiences.events.feature1')}</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>{t('home.audiences.events.feature2')}</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-accent mr-2">✓</span>
                    <span>{t('home.audiences.events.feature3')}</span>
                  </li>
                </ul>
                <Link href="/services">
                  <Button variant="outline" className="w-full">
                    {t('home.audiences.events.cta')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {t('home.cta.subtitle')}
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              {t('home.cta.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
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

