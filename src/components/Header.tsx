import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Map, List } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: "/events", label: "Список мероприятий", icon: List },
    { path: "/map", label: "Карта мероприятий", icon: Map },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Условный рендер логотипа */}
        {location.pathname === "/" ? (
          <a
            href="#"
            onClick={handleLogoClick}
            className="text-xl font-bold text-primary hover:text-accent transition-colors cursor-pointer"
          >
            Культура в кармане
          </a>
        ) : (
          <Link to="/" className="text-xl font-bold text-primary hover:text-accent transition-colors">
            Культура в кармане
          </Link>
        )}
        
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          <Link to="/events/today">
            <Button
              size="sm"
              className="btn-cultural 
                        group 
                        transition-all duration-300 
                        hover:scale-105 hover:shadow-xl hover:shadow-primary/30 
                        active:scale-95"
            >
              <Calendar
                size={16}
                className="mr-2 transition-transform duration-300 group-hover:scale-120 group-hover:rotate-12"
              />
              Мероприятия сегодня
            </Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Link to="/events/today">
            <Button size="sm" variant="outline">
              <Calendar size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;