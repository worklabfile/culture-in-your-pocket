import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Sparkles } from "lucide-react";

// Mock data for today's events
const todaysEvents = [
  {
    id: 1,
    title: "Выставка современного искусства",
    description: "Уникальная коллекция работ белорусских художников XXI века",
    time: "18:00",
    location: "Национальный художественный музей",
    category: "Выставка",
    status: "Начинается скоро"
  },
  {
    id: 3,
    title: "Спектакль 'Вишневый сад'",
    description: "Классическая пьеса А.П. Чехова в современной интерпретации",
    time: "19:00",
    location: "Национальный академический театр им. Янки Купалы",
    category: "Театр",
    status: "Доступны билеты"
  }
];

const EventsToday = () => {
  const today = new Date().toLocaleDateString('ru-RU', { 
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              Мероприятия сегодня
            </h1>
          </div>
          <p className="text-muted-foreground text-lg mb-2">
            {today}
          </p>
          <p className="text-muted-foreground">
            Что происходит в культурной жизни Минска прямо сейчас
          </p>
        </div>

        {todaysEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {todaysEvents.map((event, index) => (
              <Card 
                key={event.id} 
                className="event-card animate-fade-in bg-gradient-to-br from-card to-card/50
                           transition-all duration-300 
                           hover:scale-110 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/40 
                           cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/30 to-accent/30 rounded-t-xl relative">
                  <Badge 
                    className="absolute top-4 right-4 bg-accent text-accent-foreground"
                  >
                    {event.status}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {event.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold line-clamp-2">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center text-primary font-medium">
                    <Clock size={18} className="mr-2" />
                    Сегодня в {event.time}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin size={16} className="mr-2" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link to={`/event/${event.id}`} className="flex-1">
                      <Button
                        className="w-full btn-outline-cultural 
                                  group 
                                  transition-all duration-300 
                                  hover:scale-105 hover:shadow-lg hover:shadow-primary/20 
                                  active:scale-95"
                      >
                        Подробнее
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="flex-1 
                                group 
                                transition-all duration-300 
                                hover:scale-105 hover:shadow-lg hover:shadow-primary/20 
                                active:scale-95
                                will-change-transform 
                                backface-visibility-hidden
                                border-none"
                    >
                      Маршрут
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 max-w-md mx-auto">
            <Calendar size={64} className="mx-auto text-muted-foreground mb-6" />
            <h3 className="text-xl font-semibold mb-4">Сегодня нет мероприятий</h3>
            <p className="text-muted-foreground mb-6">
              Но не расстраивайтесь! Посмотрите, что интересного планируется на ближайшие дни.
            </p>
            <Link to="/events">
              <Button className="btn-cultural">
                Все мероприятия
              </Button>
            </Link>
          </div>
        )}

        {todaysEvents.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/events">
              <Button variant="outline" size="lg"
                className="flex-1 
                          group
                          bg-white 
                          transition-all duration-300 
                          hover:scale-105 hover:shadow-lg hover:shadow-primary/20 
                          active:scale-95
                          will-change-transform 
                          backface-visibility-hidden
                          "
              >
                Посмотреть все мероприятия
              </Button>
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsToday;