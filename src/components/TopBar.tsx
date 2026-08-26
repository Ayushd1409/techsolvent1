import { Phone, Mail, MessageCircle } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-secondary text-secondary-foreground py-2 text-sm">
      <div className="container mx-auto flex items-center justify-center gap-4 md:gap-8 flex-wrap">
        <a href="tel:+919560133711" className="flex items-center gap-1.5 hover:text-gold transition-colors">
          <Phone className="w-3.5 h-3.5" />
          <span>+91-9560133711</span>
        </a>
        <span className="text-muted-foreground">|</span>
        <a href="tel:+18557630320" className="flex items-center gap-1.5 hover:text-gold transition-colors">
          <Phone className="w-3.5 h-3.5" />
          <span>+1-855-763-0320</span>
        </a>
        <span className="text-muted-foreground">|</span>
        <a href="mailto:contactus@ezrankings.com" className="flex items-center gap-1.5 hover:text-gold transition-colors">
          <Mail className="w-3.5 h-3.5" />
          <span>contactus@ezrankings.com</span>
        </a>
        <span className="text-muted-foreground">|</span>
        <a href="#" className="flex items-center gap-1.5 hover:text-gold transition-colors">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default TopBar;
