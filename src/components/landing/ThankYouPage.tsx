import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  MessageCircle, 
  Gift, 
  ArrowRight,
  Map,
  BookOpen,
  Coffee,
  Timer,
  Trophy
} from "lucide-react";

interface ThankYouPageProps {
  bookingDetails?: {
    date?: string;
    time?: string;
  };
  onBackToHome: () => void;
}

export default function ThankYouPage({ bookingDetails, onBackToHome }: ThankYouPageProps) {
  const academyAddress = "123 Chess Street, Grandmaster Plaza, City Center";
  const googleMapsLink = "https://maps.google.com/?q=Chess+Academy";

  return (
    <div className="min-h-screen bg-black-rich text-white-soft font-sans selection:bg-gold selection:text-black-rich">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-full mb-8"
          >
            <CheckCircle2 className="h-10 w-10 text-gold" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight max-w-4xl mx-auto"
          >
            🎉 You Just Took a Step That Can <span className="text-gold">Shape Your Child’s Future</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto font-light"
          >
            Your trial session has been successfully reserved. Now let’s make sure your child gets the maximum benefit from it.
          </motion.p>
        </div>
      </section>

      {/* Video Section (VSL) */}
      <section className="py-20 bg-dark-grey">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border-4 border-gold/30 shadow-2xl shadow-gold/10 aspect-video"
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/OVxO30a61IA?autoplay=0&mute=0"
                title="Welcome to Chess Verse"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
            <p className="text-center mt-6 text-muted-foreground italic">
              Watch this short message from our Head Coach
            </p>
          </div>
        </div>
      </section>

      {/* Reinforcement Section */}
      <section className="py-24 bg-black-rich">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-16">
            “You didn’t just book a class… <br className="hidden md:block" />
            <span className="text-gold italic">you chose growth over distraction.</span>”
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 border border-gold/20">
                <Timer className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-2">Better focus starts here</h3>
              <p className="text-muted-foreground text-sm">Mental discipline cultivated through every move.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 border border-gold/20">
                <CheckCircle2 className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-2">Confidence builds here</h3>
              <p className="text-muted-foreground text-sm">Empowering children to trust their decisions.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 border border-gold/20">
                <Trophy className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-2">Winners are trained here</h3>
              <p className="text-muted-foreground text-sm">Strategic thinking that lasts a lifetime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Session Details Section */}
      <section className="py-20 bg-white-soft text-black-rich">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-border p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-1 space-y-8">
                <h2 className="text-3xl font-heading font-bold">Session Details</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/10 p-3 rounded-xl">
                      <MapPin className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Academy Address</p>
                      <p className="text-lg font-medium">{academyAddress}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/10 p-3 rounded-xl">
                      <CalendarIcon className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Date</p>
                      <p className="text-lg font-medium">{bookingDetails?.date || "To be confirmed"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/10 p-3 rounded-xl">
                      <Clock className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Time</p>
                      <p className="text-lg font-medium">{bookingDetails?.time || "To be confirmed"}</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-black-rich hover:bg-black-rich/90 text-white-soft font-bold py-6 rounded-xl flex items-center justify-center gap-2"
                  onClick={() => window.open(googleMapsLink, "_blank")}
                >
                  <Map className="h-5 w-5" />
                  📍 Get Directions
                </Button>
              </div>
              
              <div className="flex-1 bg-muted rounded-2xl overflow-hidden min-h-[300px] relative">
                {/* Placeholder for Map */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                  <MapPin className="h-12 w-12 mb-4 opacity-20" />
                  <p className="font-medium">Interactive Map View</p>
                  <p className="text-xs">Grandmaster Plaza, City Center</p>
                </div>
                <img 
                  src="https://picsum.photos/seed/map/600/600" 
                  alt="Map location" 
                  className="w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Section */}
      <section className="py-24 bg-black-rich">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">How to Prepare for the Session</h2>
            
            <div className="space-y-6">
              {[
                { icon: Timer, text: "Arrive 5 minutes early to get familiar with the environment." },
                { icon: Coffee, text: "Ensure your child is relaxed and has had a light snack." },
                { icon: BookOpen, text: "Avoid distractions or heavy screen time before the session." },
                { icon: CheckCircle2, text: "Bring a notebook and pen (optional, but recommended)." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 p-6 bg-dark-grey rounded-2xl border border-white/5"
                >
                  <div className="bg-gold/20 p-3 rounded-full">
                    <item.icon className="h-6 w-6 text-gold" />
                  </div>
                  <p className="text-lg">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-24 bg-gold text-black-rich">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-black-rich text-white-soft rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full mb-8">
                <Gift className="h-4 w-4" />
                <span className="text-sm font-bold uppercase tracking-widest">Exclusive Bonus</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-10">
                🎁 Special Bonus for <br />
                <span className="text-gold">Your First Visit</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-dark-grey rounded-2xl border border-white/5">
                  <p className="text-gold font-bold text-lg mb-2">01</p>
                  <p className="font-bold mb-2">Free Skill Assessment</p>
                  <p className="text-sm text-muted-foreground">Professional evaluation of current chess knowledge.</p>
                </div>
                <div className="p-6 bg-dark-grey rounded-2xl border border-white/5">
                  <p className="text-gold font-bold text-lg mb-2">02</p>
                  <p className="font-bold mb-2">Personalized Roadmap</p>
                  <p className="text-sm text-muted-foreground">A clear path from beginner to tournament player.</p>
                </div>
                <div className="p-6 bg-dark-grey rounded-2xl border border-white/5">
                  <p className="text-gold font-bold text-lg mb-2">03</p>
                  <p className="font-bold mb-2">Expert Tips</p>
                  <p className="text-sm text-muted-foreground">Immediate strategies to improve your game faster.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Confirmation */}
      <section className="py-24 bg-white-soft text-black-rich">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-4">Final Step: Confirm Your Slot</h2>
            <p className="text-muted-foreground mb-10">
              Click below to confirm your visit and receive important updates and reminders.
            </p>
            
            <Button 
              size="lg"
              className="bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold px-12 py-8 text-xl rounded-full shadow-xl flex items-center justify-center gap-3 mx-auto w-full sm:w-auto"
              onClick={() => window.open("https://wa.me/918787804554?text=I%20just%20booked%20my%20trial%20class!", "_blank")}
            >
              <MessageCircle className="h-6 w-6" />
              Confirm Your Slot on WhatsApp
            </Button>
            
            <p className="mt-8 text-sm text-muted-foreground italic">
              “We keep limited trial slots to give proper attention to each student.”
            </p>
          </div>
        </div>
      </section>

      {/* Final Reassurance CTA */}
      <section className="py-24 bg-black-rich text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10">
            We’re excited to meet you at the academy. <br />
            <span className="text-gold">See you soon.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg"
              className="bg-gold hover:bg-gold/90 text-black-rich font-bold px-10 py-6 rounded-full"
              onClick={onBackToHome}
            >
              Back to Home
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white/20 text-white-soft hover:bg-white/5 px-10 py-6 rounded-full"
              onClick={() => window.open("https://wa.me/918787804554", "_blank")}
            >
              Confirm My Visit
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black-rich border-t border-white/5 text-center">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Chess Verse. All rights reserved.</p>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-black-rich/80 backdrop-blur-md border-t border-white/10 z-50">
        <Button 
          className="w-full bg-[#25D366] text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
          onClick={() => window.open("https://wa.me/918787804554", "_blank")}
        >
          <MessageCircle className="h-5 w-5" />
          Confirm on WhatsApp
        </Button>
      </div>
    </div>
  );
}
