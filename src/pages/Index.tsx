import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventSubmissionForm from "@/components/EventSubmissionForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Users, Sparkles, ArrowRight, Star, Heart } from "lucide-react";
import culturalHero from "@/assets/cultural-hero.jpg";

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: "Актуальные события",
      description: "Всегда свежая информация о культурных мероприятиях Минска"
    },
    {
      icon: MapPin,
      title: "Удобная карта",
      description: "Находите события рядом с вами на интерактивной карте города"
    },
    {
      icon: Users,
      title: "Для всех",
      description: "События для любых возрастов и интересов - от классики до авангарда"
    },
    {
      icon: Sparkles,
      title: "Качественный отбор",
      description: "Только лучшие и проверенные культурные мероприятия"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-hero-gradient opacity-90"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${culturalHero})` }}
          ></div>
          
          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="hero-title mb-6">
                Культура в кармане
              </h1>
              <p className="hero-subtitle mb-8">
                Ваш персональный гид по культурной жизни Минска. Откройте для себя 
                лучшие театры, музеи, концерты и выставки в одном приложении.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/map">
                  <Button size="lg" className="btn-cultural text-lg px-8 py-4">
                    <MapPin className="mr-2" size={20} />
                    Открыть карту мероприятий
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/events/today">
                  <Button size="lg" variant="outline" className="btn-outline-cultural text-lg px-8 py-4">
                    <Calendar className="mr-2" size={20} />
                    Что сегодня?
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-subtle-gradient">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Почему выбирают нас?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Мы делаем культурную жизнь Минска доступной и удобной для каждого
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index} 
                    className="event-card text-center animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
                        <Icon size={28} className="text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold">200+</div>
                <div className="text-primary-foreground/80">Мероприятий в месяц</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">50+</div>
                <div className="text-primary-foreground/80">Культурных площадок</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">10K+</div>
                <div className="text-primary-foreground/80">Довольных пользователей</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Что говорят наши пользователи
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Анна Петрова",
                  role: "Театралка",
                  text: "Благодаря этому сайту я не пропускаю ни одной интересной премьеры! Очень удобно."
                },
                {
                  name: "Михаил Иванов", 
                  role: "Любитель искусства",
                  text: "Отличная подборка выставок и музейных мероприятий. Рекомендую всем!"
                },
                {
                  name: "Елена Сидорова",
                  role: "Организатор мероприятий", 
                  text: "Простая форма подачи заявок помогает нам привлекать больше посетителей."
                }
              ].map((testimonial, index) => (
                <Card key={index} className="event-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Event Submission Form Section */}
        <section id="submit-form" className="py-20 bg-subtle-gradient">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Поделитесь с нами
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Знаете о интересном культурном событии? Помогите другим его найти!
              </p>
            </div>
            
            <EventSubmissionForm />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Готовы погрузиться в культурную жизнь Минска?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Присоединяйтесь к тысячам людей, которые уже открыли для себя 
                удивительный мир культуры нашего города
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/events">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                    <Heart className="mr-2" size={20} />
                    Все мероприятия
                  </Button>
                </Link>
                <Link to="/map">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <MapPin className="mr-2" size={20} />
                    Открыть карту
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
