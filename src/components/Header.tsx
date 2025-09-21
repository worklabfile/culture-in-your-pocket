import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Map, List, Menu, X } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: "/events", label: "Список мероприятий", icon: List },
    { path: "/map", label: "Карта мероприятий", icon: Map },
    { path: "/events/today", label: "Мероприятия сегодня", icon: Calendar },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {location.pathname === "/" ? (
          <a
            href="#"
            onClick={handleLogoClick}
            className="text-xl font-bold text-primary hover:text-accent transition-colors cursor-pointer"
          >
            Культура в кармане
          </a>
        ) : (
          <Link
            to="/"
            className="text-xl font-bold text-primary hover:text-accent transition-colors"
          >
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
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu toggle button */}
        <div className="md:hidden">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown menu with very smooth animation */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-1000 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`flex flex-col p-4 space-y-3 bg-card shadow-lg border-t border-border transition-opacity duration-1000 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors delay-[${
                  index * 100
                }ms] ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
