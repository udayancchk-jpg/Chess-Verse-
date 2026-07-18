import { Trophy } from "lucide-react";

interface FooterProps {
  onAboutClick: () => void;
  onHomeClick: () => void;
  onAssessmentClick: () => void;
}

export default function Footer({ onAboutClick, onHomeClick, onAssessmentClick }: FooterProps) {
  return (
    <footer className="py-12 bg-black-rich text-white-soft border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <button onClick={onHomeClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-gold p-1.5 rounded-lg">
              <Trophy className="h-6 w-6 text-black-rich" />
            </div>
            <span className="text-xl font-heading font-bold tracking-tighter uppercase">CHESS VERSE</span>
          </button>
          
          <div className="flex gap-8 text-sm text-muted-foreground">
            <button onClick={onHomeClick} className="hover:text-gold transition-colors">Home</button>
            <button onClick={onAboutClick} className="hover:text-gold transition-colors">About Us</button>
            <button onClick={onAssessmentClick} className="hover:text-gold transition-colors">AI Assessment</button>
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
          </div>

          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Chess Verse. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
