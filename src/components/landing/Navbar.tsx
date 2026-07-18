import { motion, useScroll, useSpring } from "motion/react";
import { Trophy, MoreVertical, Star, Info, Home, Calendar } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onAboutClick: () => void;
  onHomeClick: () => void;
  onAssessmentClick: () => void;
  onBookTrial: () => void;
}

export default function Navbar({ onAboutClick, onHomeClick, onAssessmentClick, onBookTrial }: NavbarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

          <div className="flex items-center gap-3">
            <Button 
              size="sm" 
              className="hidden sm:flex bg-gold hover:bg-gold/90 text-black-rich font-bold rounded-full px-6"
              onClick={onBookTrial}
            >
              Book Free Trial
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "text-white-soft hover:bg-white/10 rounded-full h-10 w-10 flex items-center justify-center"
              )}>
                <MoreVertical className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-dark-grey border-white/10 text-white-soft rounded-2xl shadow-2xl p-2 z-[60]">
                <DropdownMenuItem 
                  onClick={onHomeClick}
                  className="rounded-xl focus:bg-gold focus:text-black-rich gap-3 py-3 cursor-pointer"
                >
                  <Home className="h-4 w-4" />
                  <span className="font-medium">Home</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={onAboutClick}
                  className="rounded-xl focus:bg-gold focus:text-black-rich gap-3 py-3 cursor-pointer"
                >
                  <Info className="h-4 w-4" />
                  <span className="font-medium">About Us</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={onAssessmentClick}
                  className="rounded-xl focus:bg-gold focus:text-black-rich gap-3 py-3 cursor-pointer"
                >
                  <Star className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">Personalized AI</span>
                    <span className="text-[10px] opacity-70">Strategic Assessment</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5 my-2" />
                <DropdownMenuItem 
                  onClick={onBookTrial}
                  className="rounded-xl focus:bg-gold focus:text-black-rich gap-3 py-3 cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Book Free Trial</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
}
