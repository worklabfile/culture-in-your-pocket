import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Clock, Search, Filter } from "lucide-react";

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Выставка современного искусства",
    description: "Уникальная коллекция работ белорусских художников XXI века",
    date: "2024-01-15",
    time: "18:00",
    location: "Национальный художественный музей",
    category: "Выставка",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Концерт классической музыки",
    description: "Вечер камерной музыки в исполнении квартета Минской филармонии",
    date: "2024-01-18",
    time: "19:30",
    location: "Белорусская государственная филармония",
    category: "Концерт",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Спектакль 'Вишневый сад'",
    description: "Классическая пьеса А.П. Чехова в современной интерпретации",
    date: "2024-01-20",
    time: "19:00",
    location: "Национальный академический театр им. Янки Купалы",
    category: "Театр",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Фестиваль документального кино",
    description: "Показ лучших документальных фильмов года",
    date: "2024-01-22",
    time: "16:00",
    location: "Кинотеатр 'Москва'",
    category: "Кино",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Мастер-класс по керамике",
    description: "Изучаем древнее искусство создания керамических изделий",
    date: "2024-01-25",
    time: "14:00",
    location: "Центр народного творчества",
    category: "Мастер-класс",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Джазовый вечер",
    description: "Живая музыка от лучших джазовых исполнителей Беларуси",
    date: "2024-01-28",
    time: "20:00",
    location: "Клуб 'Re:Public'",
    category: "Концерт",
    image: "/placeholder.svg"
  }
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const filteredEvents = mockEvents.filter(event => {
    const matchesTitle = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate ? event.date === selectedDate : true;
    return matchesTitle && matchesDate;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Культурные мероприятия Минска
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Откройте для себя богатую культурную жизнь столицы
          </p>
        </div>

        {/* Search and Date Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск мероприятий..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-64">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <Card 
              key={event.id} 
              className="event-card animate-fade-in opacity-0
                         transition-all duration-300 
                         hover:scale-110 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/40 
                         cursor-pointer"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards' 
              }}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-xl"></div>
              
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {event.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold line-clamp-2">
                  {event.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {event.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar size={16} className="mr-2" />
                  {formatDate(event.date)}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={16} className="mr-2" />
                  {event.time}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin size={16} className="mr-2" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                
                <Link to={`/event/${event.id}`} className="block w-full">
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
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Мероприятия не найдены</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить параметры поиска или фильтры
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;