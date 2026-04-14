import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Check, Gift } from "lucide-react";

export default function Offer() {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-gold relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border-8 border-black rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 border-8 border-black rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-black-rich rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-2xl">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full mb-6">
              <Gift className="h-4 w-4" />
              <span className="text-sm font-bold uppercase tracking-wider">Exclusive Launch Offer</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white-soft mb-6">
              Free Trial Class <br />
              <span className="text-gold text-3xl md:text-4xl">(Worth ₹999)</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience our premium coaching first-hand. No commitment required.
            </p>
            
            <ul className="space-y-4 mb-10 text-left max-w-md mx-auto lg:mx-0">
              <li className="flex items-center gap-3 text-white-soft">
                <div className="bg-gold rounded-full p-1">
                  <Check className="h-4 w-4 text-black-rich" />
                </div>
                <span>45-Minute Live Interaction</span>
              </li>
              <li className="flex items-center gap-3 text-white-soft">
                <div className="bg-gold rounded-full p-1">
                  <Check className="h-4 w-4 text-black-rich" />
                </div>
                <span>Skill Assessment & Level Check</span>
              </li>
              <li className="flex items-center gap-3 text-white-soft">
                <div className="bg-gold rounded-full p-1">
                  <Check className="h-4 w-4 text-black-rich" />
                </div>
                <span>Personalized Learning Roadmap</span>
              </li>
            </ul>

            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold/90 text-black-rich font-bold px-10 py-7 text-xl rounded-full w-full sm:w-auto shadow-lg shadow-gold/20"
              onClick={scrollToBooking}
            >
              Claim Your Free Trial
            </Button>
          </div>

          <div className="flex-1 relative">
            <motion.div
              initial={{ rotate: -5, scale: 0.9 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-gold/30"
            >
              <img 
                src="https://picsum.photos/seed/chess-kid/800/600" 
                alt="Child playing chess" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-rich/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white-soft font-bold text-lg">"The best decision for my son's focus."</p>
                <p className="text-gold text-sm">- Priya M., Parent</p>
              </div>
            </motion.div>
            
            {/* Decorative background shape */}
            <div className="absolute -inset-4 bg-gold/20 blur-2xl rounded-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
