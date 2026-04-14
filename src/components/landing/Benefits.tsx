import { motion } from "motion/react";
import { CheckCircle2, Focus, Lightbulb, ShieldCheck, TrendingUp, Zap } from "lucide-react";

const benefits = [
  {
    icon: Focus,
    title: "Better Concentration",
    description: "Chess requires deep focus, helping kids stay attentive for longer periods."
  },
  {
    icon: Zap,
    title: "Faster Decision Making",
    description: "Learn to evaluate options and make the right move under time pressure."
  },
  {
    icon: Lightbulb,
    title: "Strategic Thinking",
    description: "Develop the ability to plan 5-10 steps ahead in both chess and life."
  },
  {
    icon: ShieldCheck,
    title: "Confidence Boost",
    description: "Winning games and solving puzzles builds immense self-belief."
  },
  {
    icon: TrendingUp,
    title: "Academic Performance",
    description: "Proven correlation between chess skills and improved math/logic scores."
  },
  {
    icon: CheckCircle2,
    title: "Tournament Ready",
    description: "Get prepared for state, national, and international level championships."
  }
];

export default function Benefits() {
  return (
    <section className="py-24 bg-black-rich text-white-soft">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Why Chess is the <span className="text-gold">Best Investment</span> for Your Child
            </h2>
            <p className="text-lg text-muted-foreground">
              Beyond the board, chess teaches life skills that traditional classrooms often miss.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-gold font-heading italic text-xl">Grandmaster Mindset</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-dark-grey border border-white/5 hover:border-gold/30 transition-all"
            >
              <benefit.icon className="h-10 w-10 text-gold mb-6 transition-transform group-hover:scale-110" />
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
