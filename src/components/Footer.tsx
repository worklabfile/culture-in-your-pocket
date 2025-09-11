import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-subtle-gradient border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Культура в кармане</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ваш путеводитель по культурным мероприятиям Минска. Откройте для себя 
              удивительный мир искусства, театра, музыки и многого другого.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Контакты</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@cultura-minsk.by</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+375 (29) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Минск, Беларусь</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">О проекте</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Мы стремимся сделать культурную жизнь Минска доступной и удобной 
              для всех жителей и гостей города.
            </p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center">
            Сделано с <Heart size={16} className="mx-1 text-red-500" /> для города Минска
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;