import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-black-rich text-white-soft relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #D4AF37 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">
            Give Your Child a Skill That <span className="text-gold">Lasts a Lifetime</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Join the elite circle of young strategic thinkers. Limited slots available for this month's intake.
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold/90 text-black-rich font-bold px-12 py-8 text-2xl rounded-full shadow-2xl shadow-gold/20 transition-all transform hover:scale-105"
              onClick={scrollToBooking}
            >
              Book Free Trial Now
            </Button>
            <p className="text-gold font-bold animate-pulse">
              Only 4 Trial Slots Left This Week!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
