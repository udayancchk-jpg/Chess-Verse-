import { Calendar, CheckCircle2, PlayCircle } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    title: "Book Your Trial",
    description: "Select a convenient time slot from our calendar and fill in basic details."
  },
  {
    icon: PlayCircle,
    title: "Attend Live Class",
    description: "Join the online session where our expert coach will assess your current level."
  },
  {
    icon: CheckCircle2,
    title: "Start Your Journey",
    description: "Get a personalized roadmap and start regular coaching to master the game."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white-soft text-black-rich overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Your Path to <span className="text-gold italic">Mastery</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to unlock your child's strategic potential.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gold/20 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-black-rich rounded-2xl flex items-center justify-center mb-8 shadow-xl border-4 border-white transform transition-transform hover:scale-110 hover:rotate-3">
                  <step.icon className="h-10 w-10 text-gold" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-black-rich font-bold text-sm border-2 border-white">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
