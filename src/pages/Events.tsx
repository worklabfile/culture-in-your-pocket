import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Clock, Search } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Helper function to parse the first date from the comma-separated list to YYYY-MM-DD format
const parseDate = (dateStr) => {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  const firstDate = dateStr.split(',')[0].trim();
  const parts = firstDate.split(' ');
  const day = parseInt(parts[0], 10);
  const monthStr = parts[1];
  const monthMap = {
    'января': '01', 'февраля': '02', 'марта': '03', 'апреля': '04', 'мая': '05', 'июня': '06',
    'июля': '07', 'августа': '08', 'сентября': '09', 'октября': '10', 'ноября': '11', 'декабря': '12'
  };
  const month = monthMap[monthStr] || '01';
  const year = new Date().getFullYear(); // Assume current year
  return `${year}-${month}-${day.toString().padStart(2, '0')}`;
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const spreadsheetId = '1U1qBrsnQsv2wn0EkGU7GPMZX88wcHKnc2hvHkdykUZk';
        const apiKey = 'AIzaSyBScuwFWwr9fhUpAnKytPYfiAlf8bw2voQ';
        const range = 'A1:K';
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        
        if (!data.values || data.values.length < 2) {
          throw new Error('No data found in the sheet');
        }
        
        const headers = data.values[0];
        const rows = data.values.slice(1);
        
        const rawEvents = rows.map(row => {
          const eventObj = {};
          headers.forEach((header, index) => {
            eventObj[header] = row[index] || '';
          });
          return eventObj;
        });
        
        const mappedEvents = rawEvents.map((event, index) => ({
          id: index + 1,
          title: event['Название'] || '',
          description: event['Краткое описание'] || '',
          date: parseDate(event['Дата'] || ''),
          time: event['Время'] || '',
          location: event['Место'] || '',
          category: event['Жанр'] || '',
          image: event['Фото'] || '',
          address: event['Адрес'] || '',
          coordinates: event['Координаты'] || '',
          cost: event['Стоимость'] || '',
          link: event['Ссылка'] || ''
        })).filter(event => event.title);
        
        setEvents(mappedEvents);
      } catch (err) {
        console.error('Error fetching from Google Sheets:', err);
        setError(`Error fetching data from Google Sheets: ${err.message}. Make sure the sheet is publicly accessible (share with "Anyone with the link can view").`);
      }
    };

    fetchEvents();
  }, []);

  // Helper to get today's date in YYYY-MM-DD for comparisons
  const todayStr = new Date().toISOString().split('T')[0];

  // Filter by title search and optional exact date, then exclude past dates
  const filteredEvents = events
    .filter(event => (event.title || '').toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(event => (selectedDate ? event.date === selectedDate : true))
    .filter(event => event.date >= todayStr);

  // Sort ascending by date (from today onwards)
  const sortedEvents = [...filteredEvents].sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));

  // Pagination
  const totalPages = Math.ceil(sortedEvents.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = sortedEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDate]);

  const formatDate = (dateString) => {
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

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск по названию..."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedEvents.map((event) => (
            <Card key={event.id} className="event-card">
              {event.image ? (
                <img src={event.image} alt={event.title} className="w-full aspect-video object-cover rounded-t-xl" />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-xl"></div>
              )}
              
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {event.category}
                  </Badge>
                  {event.cost && (
                    <Badge variant="outline" className="text-xs">
                      {event.cost}
                    </Badge>
                  )}
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
                
                {event.address && (
                  <div className="text-sm text-muted-foreground">
                    {event.address}
                  </div>
                )}
                
                <div className="flex gap-2">
                  {event.link && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={event.link} target="_blank" rel="noopener noreferrer">
                        Сайт
                      </a>
                    </Button>
                  )}
                  <Link to={`/event/${event.id}`} className="flex-1">
                    <Button className="w-full btn-outline-cultural">
                      Подробнее
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedEvents.length === 0 && (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Измените запрос или дату</p>
          </div>
        )}

        {sortedEvents.length > 0 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }}
                    aria-disabled={currentPage === 1}
                  >
                    Назад
                  </PaginationPrevious>
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}
                    aria-disabled={currentPage === totalPages}
                  >
                    Далее
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;