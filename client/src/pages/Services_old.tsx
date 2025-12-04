import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Leaf, TreeDeciduous, Droplets, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
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
            <Link href="/services" className="text-sm font-medium text-foreground">
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
              {t('services.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('services.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-16 px-4">
        <div className="container">
          <Tabs defaultValue="reforestation" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="reforestation" className="gap-2">
                <TreeDeciduous className="h-4 w-4" />
                {t('services.tabs.reforestation')}
              </TabsTrigger>
              <TabsTrigger value="landscape" className="gap-2">
                <Leaf className="h-4 w-4" />
                {t('services.tabs.landscape')}
              </TabsTrigger>
              <TabsTrigger value="irrigation" className="gap-2">
                <Droplets className="h-4 w-4" />
                {t('services.tabs.irrigation')}
              </TabsTrigger>
            </TabsList>

            {/* Reforestation Tab */}
            <TabsContent value="reforestation" className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <Badge className="mb-4">{t('services.reforestation.badge')}</Badge>
                  <h2 className="text-3xl font-bold mb-4">
                    {t('services.reforestation.title')}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t('services.reforestation.description')}
                  </p>
                  <Link href="/contact">
                    <Button size="lg">
                      {t('services.reforestation.cta')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>{t('services.reforestation.processTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t('services.reforestation.step1Title')}</h4>
                        <p className="text-sm text-muted-foreground">{t('services.reforestation.step1Desc')}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t('services.reforestation.step2Title')}</h4>
                        <p className="text-sm text-muted-foreground">{t('services.reforestation.step2Desc')}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t('services.reforestation.step3Title')}</h4>
                        <p className="text-sm text-muted-foreground">{t('services.reforestation.step3Desc')}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t('services.reforestation.step4Title')}</h4>
                        <p className="text-sm text-muted-foreground">{t('services.reforestation.step4Desc')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{t('services.reforestation.card1Title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('services.reforestation.card1Desc')}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{t('services.reforestation.card2Title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('services.reforestation.card2Desc')}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{t('services.reforestation.card3Title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('services.reforestation.card3Desc')}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Landscape Tab */}
            <TabsContent value="landscape" className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <Badge className="mb-4 bg-secondary text-secondary-foreground">{t('services.landscape.badge')}</Badge>
                  <h2 className="text-3xl font-bold mb-4">
                    {t('services.landscape.title')}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t('services.landscape.description')}
                  </p>
                  <Link href="/contact">
                    <Button size="lg" variant="secondary">
                      {t('services.landscape.cta')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>{t('services.landscape.servicesTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{t('services.landscape.service1Title')}</h4>
                        <p className="text-sm text-muted-foreground">{t('services.landscape.service1Desc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{t('services.landscape.service2Title')}</h4>
                        <p className="text-sm text-muted-foreground">{t('services.landscape.service2Desc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{t('services.landscape.service3Title')}</h4>
                        <p className="text-sm text-muted-foreground">{t('services.landscape.service3Desc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{t('services.landscape.service4Title')}</h4>
                        <p className="text-sm text-muted-foreground">{t('services.landscape.service4Desc')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('services.landscape.homeownersTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{t('services.landscape.homeownersDesc')}</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{t('services.landscape.homeownersFeature1')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{t('services.landscape.homeownersFeature2')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{t('services.landscape.homeownersFeature3')}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t('services.landscape.eventsTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{t('services.landscape.eventsDesc')}</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{t('services.landscape.eventsFeature1')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{t('services.landscape.eventsFeature2')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>{t('services.landscape.eventsFeature3')}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Irrigation Tab */}
            <TabsContent value="irrigation" className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <Badge className="mb-4 bg-accent text-accent-foreground">{t('services.irrigation.badge')}</Badge>
                  <h2 className="text-3xl font-bold mb-4">
                    {t('services.irrigation.title')}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t('services.irrigation.description')}
                  </p>
                  <Link href="/contact">
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      {t('services.irrigation.cta')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>{t('services.irrigation.techTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Droplets className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{t('services.irrigation.tech1Title')}</h4>
                        <p className="text-sm text-muted-foreground">{t('services.irrigation.tech1Desc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Droplets className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{t('services.irrigation.tech2Title')}</h4>
                        <p className="text-sm text-muted-foreground">{t('services.irrigation.tech2Desc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Droplets className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{t('services.irrigation.tech3Title')}</h4>
                        <p className="text-sm text-muted-foreground">{t('services.irrigation.tech3Desc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Droplets className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{t('services.irrigation.tech4Title')}</h4>
                        <p className="text-sm text-muted-foreground">{t('services.irrigation.tech4Desc')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{t('services.irrigation.completeTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                        <span className="font-semibold text-accent">1</span>
                      </div>
                      <h4 className="font-semibold mb-2">{t('services.irrigation.step1Title')}</h4>
                      <p className="text-sm text-muted-foreground">{t('services.irrigation.step1Desc')}</p>
                    </div>
                    <div>
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                        <span className="font-semibold text-accent">2</span>
                      </div>
                      <h4 className="font-semibold mb-2">{t('services.irrigation.step2Title')}</h4>
                      <p className="text-sm text-muted-foreground">{t('services.irrigation.step2Desc')}</p>
                    </div>
                    <div>
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                        <span className="font-semibold text-accent">3</span>
                      </div>
                      <h4 className="font-semibold mb-2">{t('services.irrigation.step3Title')}</h4>
                      <p className="text-sm text-muted-foreground">{t('services.irrigation.step3Desc')}</p>
                    </div>
                    <div>
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                        <span className="font-semibold text-accent">4</span>
                      </div>
                      <h4 className="font-semibold mb-2">{t('services.irrigation.step4Title')}</h4>
                      <p className="text-sm text-muted-foreground">{t('services.irrigation.step4Desc')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('services.cta.title')}
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {t('services.cta.subtitle')}
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              {t('services.cta.button')}
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

