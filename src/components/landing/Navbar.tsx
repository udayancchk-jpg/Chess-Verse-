import { motion, useScroll, useSpring } from "motion/react";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onAboutClick: () => void;
  onHomeClick: () => void;
}

export default function Navbar({ onAboutClick, onHomeClick }: NavbarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToBooking = () => {
    onHomeClick();
    setTimeout(() => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-[60] origin-left"
        style={{ scaleX }}
      />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black-rich/80 backdrop-blur-md border-bottom border-white/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={onHomeClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-gold p-1.5 rounded-lg">
              <Trophy className="h-5 w-5 text-black-rich" />
            </div>
            <span className="text-lg font-heading font-bold tracking-tighter text-white-soft uppercase">CHESS VERSE</span>
          </button>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white-soft/80">
            <button onClick={onHomeClick} className="hover:text-gold transition-colors">Home</button>
            <button onClick={onAboutClick} className="hover:text-gold transition-colors">About Us</button>
            <a href="#booking" onClick={(e) => { e.preventDefault(); scrollToBooking(); }} className="hover:text-gold transition-colors">Book Trial</a>
          </div>

          <Button 
            size="sm" 
            className="bg-gold hover:bg-gold/90 text-black-rich font-bold rounded-full px-6"
            onClick={scrollToBooking}
          >
            Book Free Trial
          </Button>
        </div>
      </nav>
    </>
  );
}
