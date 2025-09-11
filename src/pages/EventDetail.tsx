import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Phone, Mail, ArrowLeft, Share2, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - in real app this would come from API
const mockEventData: Record<string, {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  address: string;
  category: string;
  organizer: string;
  phone: string;
  email: string;
  price: string;
  website: string;
}> = {
  "1": {
    id: 1,
    title: "Выставка современного искусства",
    description: "Уникальная коллекция работ белорусских художников XXI века. Эта выставка представляет самые яркие произведения современного искусства Беларуси, объединяющие традиции и новаторство.",
    fullDescription: `
      Выставка "Современное искусство Беларуси" представляет уникальную коллекцию произведений, созданных талантливыми художниками нашей страны в XXI веке. Посетители смогут познакомиться с различными направлениями и техниками современного искусства.

      В экспозиции представлены:
      • Живопись маслом и акрилом
      • Графические работы
      • Скульптура малых форм
      • Цифровое искусство
      • Инсталляции

      Выставка продлится до конца месяца и станет отличным способом провести вечер, погрузившись в мир современного белорусского искусства.
    `,
    date: "2024-01-15",
    time: "18:00",
    endTime: "21:00",
    location: "Национальный художественный музей",
    address: "ул. Ленина, 20, Минск",
    category: "Выставка",
    organizer: "Национальный художественный музей РБ",
    phone: "+375 17 227-71-22",
    email: "info@artmuseum.by",
    price: "10 BYN (льготный 5 BYN)",
    website: "www.artmuseum.by"
  }
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const eventId = id || "1";
  const event = mockEventData[eventId];

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Мероприятие не найдено</h1>
          <Link to="/events">
            <Button className="btn-cultural">
              Вернуться к списку мероприятий
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Ссылка скопирована",
        description: "Ссылка на мероприятие скопирована в буфер обмена",
      });
    }
  };

  const handleAddToFavorites = () => {
    toast({
      title: "Добавлено в избранное",
      description: "Мероприятие добавлено в ваш список избранного",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/events" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Назад к мероприятиям
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="aspect-video bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl"></div>
            
            {/* Event Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="text-sm">
                  {event.category}
                </Badge>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="flex items-center"
                  >
                    <Share2 size={16} className="mr-1" />
                    Поделиться
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddToFavorites}
                    className="flex items-center"
                  >
                    <Heart size={16} className="mr-1" />
                    В избранное
                  </Button>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                {event.title}
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
            
            {/* Full Description */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">О мероприятии</h2>
                <div className="prose prose-gray max-w-none">
                  {event.fullDescription.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <Card className="event-card">
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold text-lg mb-4">Детали мероприятия</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar className="text-primary mt-1 mr-3" size={18} />
                    <div>
                      <div className="font-medium">{formatDate(event.date)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-primary mt-1 mr-3" size={18} />
                    <div>
                      <div className="font-medium">
                        {event.time} - {event.endTime}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="text-primary mt-1 mr-3" size={18} />
                    <div>
                      <div className="font-medium">{event.location}</div>
                      <div className="text-sm text-muted-foreground">{event.address}</div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="text-lg font-semibold text-primary mb-2">
                    Стоимость: {event.price}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full btn-cultural">
                    Купить билет
                  </Button>
                  <Link to="/map" className="block w-full">
                    <Button variant="outline" className="w-full">
                      Показать на карте
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Contact Information */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold text-lg mb-4">Контакты</h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Организатор</div>
                    <div>{event.organizer}</div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-muted-foreground" />
                    <a href={`tel:${event.phone}`} className="hover:text-primary transition-colors">
                      {event.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail size={16} className="mr-2 text-muted-foreground" />
                    <a href={`mailto:${event.email}`} className="hover:text-primary transition-colors">
                      {event.email}
                    </a>
                  </div>
                  
                  <div>
                    <a 
                      href={`https://${event.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent transition-colors"
                    >
                      {event.website}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetail;