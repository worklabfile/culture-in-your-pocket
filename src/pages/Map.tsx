import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Navigation } from "lucide-react";
import { Link } from "react-router-dom";

// Mock map data
const mapEvents = [
  {
    id: 1,
    title: "Выставка современного искусства",
    location: "Национальный художественный музей",
    address: "ул. Ленина, 20",
    date: "2024-01-15",
    time: "18:00",
    category: "Выставка",
    coordinates: { lat: 53.898, lng: 27.549 }
  },
  {
    id: 2,
    title: "Концерт классической музыки",
    location: "Белорусская государственная филармония",
    address: "ул. Янки Купалы, 50",
    date: "2024-01-18",
    time: "19:30",
    category: "Концерт",
    coordinates: { lat: 53.905, lng: 27.555 }
  },
  {
    id: 3,
    title: "Спектакль 'Вишневый сад'",
    location: "Национальный академический театр им. Янки Купалы",
    address: "ул. Энгельса, 7",
    date: "2024-01-20",
    time: "19:00",
    category: "Театр",
    coordinates: { lat: 53.901, lng: 27.560 }
  }
];

const Map = () => {
  const [selectedEvent, setSelectedEvent] = useState<typeof mapEvents[0] | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Карта мероприятий Минска
          </h1>
          <p className="text-muted-foreground text-lg">
            Найдите интересные события рядом с вами
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                {/* Simple map representation */}
                <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
                  {/* River (Svisloch) */}
                  <div className="absolute top-1/3 left-1/4 w-1/2 h-2 bg-blue-300 rounded-full transform rotate-12"></div>
                  
                  {/* Event markers */}
                  {mapEvents.map((event, index) => (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:scale-110 transition-transform cultural-pulse ${
                        selectedEvent?.id === event.id ? 'bg-accent animate-cultural-pulse' : 'bg-primary'
                      }`}
                      style={{
                        left: `${30 + index * 20}%`,
                        top: `${40 + index * 10}%`
                      }}
                      title={event.title}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  {/* City center indicator */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                    <div className="text-xs text-gray-600 mt-1 whitespace-nowrap">Центр Минска</div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="text-sm font-medium mb-2">Легенда:</div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    <span>Мероприятие</span>
                  </div>
                </div>
                
                {/* Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button size="sm" variant="outline" className="bg-card/95 backdrop-blur-sm">
                    <Navigation size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Events List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Мероприятия на карте</h2>
            
            {mapEvents.map((event, index) => (
              <Card 
                key={event.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedEvent?.id === event.id ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {event.location}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={14} className="mr-2" />
                    {formatDate(event.date)}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock size={14} className="mr-2" />
                    {event.time}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {event.address}
                  </div>
                  
                  <Link to={`/event/${event.id}`}>
                    <Button size="sm" className="w-full mt-3 btn-outline-cultural">
                      Подробнее
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
            
            {/* Add more events link */}
            <Card className="border-dashed border-2 border-muted-foreground/30">
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <MapPin size={32} className="text-muted-foreground mb-3" />
                <p className="text-muted-foreground mb-4">
                  Не видите свое мероприятие на карте?
                </p>
                <Link to="/#submit-form">
                  <Button variant="outline">
                    Предложить мероприятие
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Selected Event Details */}
        {selectedEvent && (
          <Card className="mt-6 border-primary/50 bg-gradient-to-r from-card to-primary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-primary">Выбранное мероприятие</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEvent(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{selectedEvent.title}</h3>
                  <p className="text-muted-foreground mb-2">{selectedEvent.location}</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.address}</p>
                </div>
                <div className="flex flex-col justify-center space-y-2">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    {formatDate(selectedEvent.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    {selectedEvent.time}
                  </div>
                  <Link to={`/event/${selectedEvent.id}`}>
                    <Button className="mt-2 btn-cultural">
                      Подробная информация
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Map;