import { motion } from "motion/react";

const stats = [
  { label: "Students Trained", value: "500+" },
  { label: "Tournament Wins", value: "120+" },
  { label: "Avg. Rating Jump", value: "250+" },
  { label: "Expert Coaches", value: "15+" }
];

export default function Results() {
  return (
    <section className="py-20 bg-dark-grey text-white-soft">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 border-r last:border-r-0 border-white/10"
            >
              <p className="text-4xl md:text-6xl font-heading font-bold text-gold mb-2">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
