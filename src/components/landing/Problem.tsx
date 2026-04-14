import { motion } from "motion/react";
import { Brain, Target, Zap } from "lucide-react";

const problems = [
  {
    icon: Zap,
    title: "Wasting Time on Screens",
    description: "Kids spend hours on mindless mobile games and social media without any mental growth."
  },
  {
    icon: Brain,
    title: "Lack of Focus",
    description: "Short attention spans are making it harder for children to concentrate on studies and complex tasks."
  },
  {
    icon: Target,
    title: "No Strategic Thinking",
    description: "Difficulty in planning ahead or making calculated decisions in real-life situations."
  }
];

export default function Problem() {
  return (
    <section className="py-24 bg-white-soft text-black-rich">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Is Your Child's Potential Being <span className="text-gold italic">Locked Away?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            In a world of distractions, chess is the ultimate tool to sharpen the mind and build life-long discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="bg-black-rich/5 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <problem.icon className="h-7 w-7 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-4">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block bg-gold/10 px-6 py-3 rounded-full border border-gold/20">
            <p className="text-gold font-medium">The Solution: Professional Chess Coaching</p>
          </div>
        </div>
      </div>
    </section>
  );
}
