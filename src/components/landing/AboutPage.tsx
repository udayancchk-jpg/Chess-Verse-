import { motion } from "motion/react";
import { Trophy, Target, Users, Star, Quote, CheckCircle2, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AboutPageProps {
  onBookTrial: () => void;
  onBackToHome: () => void;
}

export default function AboutPage({ onBookTrial, onBackToHome }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-black-rich text-white-soft font-sans selection:bg-gold selection:text-black-rich">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight max-w-4xl mx-auto">
              We Don’t Just Teach Chess… <br />
              <span className="text-gold">We Build Thinkers</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light mb-10">
              Helping children develop focus, confidence, and strategic thinking through structured chess training.
            </p>
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold/90 text-black-rich font-bold px-10 py-7 text-xl rounded-full transition-all transform hover:scale-105"
              onClick={onBookTrial}
            >
              Book Free Trial Class
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-dark-grey">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8">
                  The Story Behind <span className="text-gold">Chess Verse</span>
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    It started with a simple observation: in a world of instant gratification and digital distractions, children were losing the ability to focus deeply.
                  </p>
                  <p>
                    We saw brilliant young minds struggling to sit still, think ahead, or handle setbacks. That's when we realized that Chess—a game of infinite possibilities—was the perfect tool to bridge this gap.
                  </p>
                  <p>
                    Chess Verse was founded not just to produce Grandmasters, but to empower the next generation with life skills. Our mission is to help every child who walks through our doors become a more patient, resilient, and strategic version of themselves.
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="flex-1 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 rounded-3xl overflow-hidden border-4 border-gold/20 shadow-2xl"
              >
                <img 
                  src="https://picsum.photos/seed/chess-story/800/1000" 
                  alt="Chess Academy Story" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -inset-4 bg-gold/10 blur-3xl rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-black-rich">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Philosophy</h2>
            <p className="text-xl text-muted-foreground">We believe that how a child thinks is more important than the moves they make.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Thinking, Not Just Moves",
                desc: "We teach the 'Why' behind every move, encouraging children to analyze consequences before acting.",
                icon: Target
              },
              {
                title: "Structured Learning",
                desc: "Our curriculum is broken down into logical steps, ensuring no child feels overwhelmed or left behind.",
                icon: CheckCircle2
              },
              {
                title: "Personalized Attention",
                desc: "Every child has a unique learning pace. We adapt our coaching to match their individual strengths.",
                icon: Users
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-10 bg-dark-grey rounded-3xl border border-white/5 hover:border-gold/30 transition-all group"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold/20 transition-colors">
                  <item.icon className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-24 bg-white-soft text-black-rich">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12">What Makes Us Different?</h2>
              <div className="space-y-8">
                {[
                  "Experienced Coaches with International Ratings",
                  "Small Batch Sizes (Max 6 students) for individual focus",
                  "Practical Learning Approach through live games",
                  "Focus on Real Improvement, not just theory",
                  "Offline Attention that builds discipline and social skills"
                ].map((point, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 bg-gold rounded-full p-1 shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-black-rich" />
                    </div>
                    <p className="text-xl font-medium">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://picsum.photos/seed/chess-1/400/500" className="rounded-2xl shadow-lg" alt="Chess Academy" referrerPolicy="no-referrer" />
                <img src="https://picsum.photos/seed/chess-2/400/300" className="rounded-2xl shadow-lg" alt="Chess Academy" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4 pt-8">
                <img src="https://picsum.photos/seed/chess-3/400/300" className="rounded-2xl shadow-lg" alt="Chess Academy" referrerPolicy="no-referrer" />
                <img src="https://picsum.photos/seed/chess-4/400/500" className="rounded-2xl shadow-lg" alt="Chess Academy" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-black-rich">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
            <div>
              <p className="text-6xl font-heading font-bold text-gold mb-2">1000+</p>
              <p className="text-xl text-muted-foreground">Students Trained</p>
            </div>
            <div>
              <p className="text-6xl font-heading font-bold text-gold mb-2">50+</p>
              <p className="text-xl text-muted-foreground">Tournament Wins</p>
            </div>
            <div>
              <p className="text-6xl font-heading font-bold text-gold mb-2">95%</p>
              <p className="text-xl text-muted-foreground">Focus Improvement Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-dark-grey">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-black-rich rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-white/5">
            <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-2xl overflow-hidden border-4 border-gold/20">
              <img src="https://picsum.photos/seed/founder/400/400" className="w-full h-full object-cover grayscale" alt="Founder" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="inline-block bg-gold/10 text-gold px-4 py-1 rounded-full text-sm font-bold mb-4">HEAD COACH & FOUNDER</div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Coach Vikram Singh</h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                "Chess changed my life by teaching me how to stay calm under pressure. My goal is to pass this superpower to every child in our academy."
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2"><Award className="h-4 w-4 text-gold" /> FIDE Rated Player (2100+)</li>
                <li className="flex items-center gap-2"><Award className="h-4 w-4 text-gold" /> 15+ Years of Coaching Experience</li>
                <li className="flex items-center gap-2"><Award className="h-4 w-4 text-gold" /> Trained 5 State Champions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-black-rich">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <Quote className="h-12 w-12 text-gold mx-auto mb-8 opacity-50" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">
              Our commitment is simple: We treat your child's growth as our own success.
            </h2>
            <div className="flex flex-wrap justify-center gap-8 opacity-50">
              <div className="flex items-center gap-2 font-bold tracking-widest uppercase text-sm">Parent Trust</div>
              <div className="flex items-center gap-2 font-bold tracking-widest uppercase text-sm">Student Success</div>
              <div className="flex items-center gap-2 font-bold tracking-widest uppercase text-sm">Quality Training</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gold text-black-rich text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">Give Your Child the Right Start</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-80">
            Join Chess Verse today and watch your child transform into a confident, strategic thinker.
          </p>
          <Button 
            size="lg" 
            className="bg-black-rich hover:bg-black-rich/90 text-white-soft font-bold px-12 py-8 text-2xl rounded-full shadow-2xl transition-all transform hover:scale-105"
            onClick={onBookTrial}
          >
            Book Free Trial Class
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black-rich border-t border-white/5 text-center">
        <button onClick={onBackToHome} className="text-gold hover:underline mb-4 block mx-auto">Back to Home</button>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Chess Verse. All rights reserved.</p>
      </footer>
    </div>
  );
}
