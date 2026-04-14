import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Trophy, Users, Star } from "lucide-react";

export default function Hero() {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black-rich text-white-soft">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 opacity-40"
          src="https://www.youtube.com/embed/OVxO30a61IA?autoplay=1&mute=1&loop=1&playlist=OVxO30a61IA&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-1">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
              Help Your Child <span className="text-gold">Think Smarter</span>, Focus Better & Win at Chess
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light"
          >
            Live Online Coaching | Beginner to Advanced | Free Trial Class
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold/90 text-black-rich font-bold px-8 py-6 text-lg rounded-full w-full sm:w-auto transition-all transform hover:scale-105"
              onClick={scrollToBooking}
            >
              Book Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gold text-gold hover:bg-gold hover:text-black-rich font-bold px-8 py-6 text-lg rounded-full w-full sm:w-auto transition-all"
              onClick={() => window.open("https://wa.me/918787804554", "_blank")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/10"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="bg-gold/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-gold" />
              </div>
              <div className="text-left">
                <p className="font-bold text-xl">500+</p>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="bg-gold/10 p-3 rounded-full">
                <Star className="h-6 w-6 text-gold" />
              </div>
              <div className="text-left">
                <p className="font-bold text-xl">Rated</p>
                <p className="text-sm text-muted-foreground">Expert Coaches</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="bg-gold/10 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-gold" />
              </div>
              <div className="text-left">
                <p className="font-bold text-xl">100+</p>
                <p className="text-sm text-muted-foreground">Tournament Winners</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Chess Piece */}
      <div className="absolute -bottom-20 -right-20 opacity-20 hidden lg:block">
        <svg width="400" height="600" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10C40 10 35 15 35 25C35 35 40 40 50 40C60 40 65 35 65 25C65 15 60 10 50 10Z" fill="#D4AF37"/>
          <path d="M30 130H70V140H30V130Z" fill="#D4AF37"/>
          <path d="M35 120H65V130H35V120Z" fill="#D4AF37"/>
          <path d="M40 40C40 40 30 60 30 90C30 110 35 120 50 120C65 120 70 110 70 90C70 60 60 40 60 40H40Z" fill="#D4AF37"/>
        </svg>
      </div>
    </section>
  );
}
