import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Trophy } from "lucide-react";

const coaches = [
  {
    name: "Coach Aryan Sharma",
    role: "FIDE Rated Coach",
    experience: "10+ Years Experience",
    achievements: ["Trained 200+ Rated Players", "State Champion 2018"],
    image: "https://picsum.photos/seed/coach1/400/500"
  },
  {
    name: "Coach Meera Iyer",
    role: "International Master Candidate",
    experience: "8+ Years Experience",
    achievements: ["National Level Player", "Certified Youth Trainer"],
    image: "https://picsum.photos/seed/coach2/400/500"
  }
];

export default function Authority() {
  return (
    <section className="py-24 bg-black-rich text-white-soft">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="outline" className="border-gold text-gold mb-4 px-4 py-1 rounded-full uppercase tracking-widest text-xs font-bold">
            The Experts
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Learn from the <span className="text-gold">Best in the Game</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our coaches aren't just players; they are mentors dedicated to your child's growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {coaches.map((coach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-dark-grey rounded-3xl overflow-hidden border border-white/5 flex flex-col sm:flex-row"
            >
              <div className="sm:w-2/5 h-64 sm:h-auto relative">
                <img 
                  src={coach.image} 
                  alt={coach.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black-rich/60 to-transparent sm:hidden"></div>
              </div>
              <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-1">{coach.name}</h3>
                <p className="text-gold font-medium mb-4">{coach.role}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-gold fill-gold" />
                    <span>{coach.experience}</span>
                  </div>
                  {coach.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white-soft">
                      <Award className="h-4 w-4 text-gold" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-gold" />
                  <span className="text-xs font-bold uppercase tracking-tighter">Certified Professional</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
