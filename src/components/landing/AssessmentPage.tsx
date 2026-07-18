import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, 
  Target, 
  Brain, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Route
} from "lucide-react";
import { GoogleGenAI, Type } from "@google/genai";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { format } from "date-fns";

interface AssessmentPageProps {
  onBookTrial: () => void;
  onBackToHome: () => void;
}

type Step = "welcome" | "input" | "quiz" | "processing" | "result";

interface QuizQuestion {
  id: number;
  question: string;
  options: { value: string; label: string }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "When faced with a complex puzzle, what's your child's first instinct?",
    options: [
      { value: "analytical", label: "Analyze every detail systematically" },
      { value: "intuitive", label: "Trust their gut and look for patterns" },
      { value: "experimental", label: "Try different things to see what works" },
      { value: "cautious", label: "Wait and observe before making any moves" }
    ]
  },
  {
    id: 2,
    question: "How does your child react to losing a game or making a mistake?",
    options: [
      { value: "curious", label: "Wants to know exactly where they went wrong" },
      { value: "resilient", label: "Ready to play again immediately" },
      { value: "reflective", label: "Needs a moment to think silently" },
      { value: "determined", label: "Becomes more focused on winning next time" }
    ]
  },
  {
    id: 3,
    question: "Which of these best describes their favorite school subject style?",
    options: [
      { value: "math", label: "Logic, Numbers, and Patterns" },
      { value: "art", label: "Design, Creativity, and Imagination" },
      { value: "reading", label: "Stories, Narratives, and Puzzles" },
      { value: "science", label: "Discovery, Facts, and Rules" }
    ]
  }
];

export default function AssessmentPage({ onBookTrial, onBackToHome }: AssessmentPageProps) {
  const [step, setStep] = React.useState<Step>("welcome");
  const [formData, setFormData] = React.useState({
    name: "",
    age: "",
    level: "",
    goals: ""
  });
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [result, setResult] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const startAssessment = () => setStep("input");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextFromInput = () => {
    if (formData.name && formData.age && formData.level && formData.goals) {
      setStep("quiz");
    }
  };

  const handleAnswerSelect = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const finishQuiz = async () => {
    if (Object.keys(answers).length === quizQuestions.length) {
      setStep("processing");
      await generateResult();
    }
  };

  const generateResult = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is not configured.");
      }

      const client = new GoogleGenAI({ apiKey });
      const prompt = `Perform a psychological and strategic assessment for a child student based on these inputs:
        Student Name: ${formData.name}
        Age: ${formData.age}
        Chess Level: ${formData.level}
        Primary Goal: ${formData.goals}
        Behavioral Responses: ${JSON.stringify(answers)}

        Please output a JSON object with:
        1. "profileTitle": A creative name for their thinking style (e.g. "The Strategic Oracle", "The Rapid Infiltrator").
        2. "profileDescription": A warm, encouraging 3-sentence description of their cognitive strengths.
        3. "keyStrengths": Array of 3 specific mental strengths.
        4. "roadmap": An array of 6 objects, each with "month" (e.g., "Month 1") and "milestone" (a specific chess/cognitive goal).
        5. "coachAdvice": A one-sentence professional tip specifically for this profile.
      `;

      const response = await client.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              profileTitle: { type: Type.STRING },
              profileDescription: { type: Type.STRING },
              keyStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              roadmap: { 
                type: Type.ARRAY, 
                items: { 
                  type: Type.OBJECT, 
                  properties: {
                    month: { type: Type.STRING },
                    milestone: { type: Type.STRING }
                  }
                } 
              },
              coachAdvice: { type: Type.STRING }
            }
          }
        }
      });

      const jsonStr = response.text?.trim();
      if (!jsonStr) {
        throw new Error("Empty response from AI");
      }

      const sanitizedJson = jsonStr.replace(/```json\n?|```/g, "").trim();
      const data = JSON.parse(sanitizedJson);
      setResult(data);
      setStep("result");
    } catch (err) {
      console.error("Assessment Error:", err);
      setError("We encountered an issue while generating your roadmap. Please check your internet connection or try again in a few moments.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black-rich text-white-soft">
      <nav className="container mx-auto px-6 py-8 flex items-center justify-between">
        <button onClick={onBackToHome} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-gold p-1.5 rounded-lg">
            <Trophy className="h-5 w-5 text-black-rich" />
          </div>
          <span className="text-lg font-heading font-bold tracking-tighter uppercase text-white-soft">CHESS VERSE</span>
        </button>
        <button onClick={onBackToHome} className="text-sm font-medium hover:text-gold transition-colors flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </button>
      </nav>

      <main className="container mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {step === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <div className="inline-block p-4 bg-gold/10 rounded-3xl mb-8">
                  <Sparkles className="h-12 w-12 text-gold animate-pulse" />
                </div>
                <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                  Discover Your Child's <br />
                  <span className="text-gold">Strategic DNA</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                  Use our advanced AI Assessment to find your child's innate thinking style 
                  and receive a personalized 6-month roadmap to chess mastery.
                </p>
                <Button 
                  size="lg"
                  onClick={startAssessment}
                  className="bg-gold hover:bg-gold/90 text-black-rich font-bold px-10 py-8 text-xl rounded-full shadow-[0_0_50px_-12px_rgba(212,175,55,0.3)]"
                >
                  Start Free Assessment <ChevronRight className="ml-2 h-6 w-6" />
                </Button>
                <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-gold" /> Cognitive Profiling
                  </div>
                  <div className="flex items-center gap-2">
                    <Route className="h-4 w-4 text-gold" /> Personalized Roadmap
                  </div>
                </div>
              </motion.div>
            )}

            {step === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-dark-grey p-8 md:p-12 rounded-[2rem] border border-white/5"
              >
                <h2 className="text-3xl font-heading font-bold mb-8 text-gold">Tell us about the Student</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-2">
                    <Label htmlFor="stud-name">Student Name</Label>
                    <Input 
                      id="stud-name" 
                      placeholder="e.g. Arjun" 
                      className="bg-black-rich border-white/10 rounded-xl"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stud-age">Age</Label>
                    <Input 
                      id="stud-age" 
                      type="number" 
                      placeholder="e.g. 8" 
                      className="bg-black-rich border-white/10 rounded-xl"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Current Chess Knowledge</Label>
                    <Select onValueChange={(v: string) => handleInputChange("level", v)}>
                      <SelectTrigger className="bg-black-rich border-white/10 rounded-xl h-12">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-grey border-white/10 text-white-soft">
                        <SelectItem value="beginner">Knows nothing yet</SelectItem>
                        <SelectItem value="basics">Knows how pieces move</SelectItem>
                        <SelectItem value="intermediate">Basic tactics/strategy</SelectItem>
                        <SelectItem value="advanced">Rated/Tournament level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Main Learning Goal</Label>
                    <Select onValueChange={(v: string) => handleInputChange("goals", v)}>
                      <SelectTrigger className="bg-black-rich border-white/10 rounded-xl h-12">
                        <SelectValue placeholder="What's the main goal?" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-grey border-white/10 text-white-soft">
                        <SelectItem value="focus">Improve School Focus & Concentration</SelectItem>
                        <SelectItem value="competitive">Win Tournaments & Get Rated</SelectItem>
                        <SelectItem value="habit">Develop a Productive Hobby</SelectItem>
                        <SelectItem value="confidence">Build Resilience & Confidence</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gold hover:bg-gold/90 text-black-rich font-bold py-7 text-lg rounded-xl"
                  onClick={nextFromInput}
                  disabled={!formData.name || !formData.age || !formData.level || !formData.goals}
                >
                  Continue to Thinking Style Quiz <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            )}

            {step === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                {quizQuestions.map((q) => (
                  <div key={q.id} className="bg-dark-grey p-8 rounded-[2rem] border border-white/5">
                    <h3 className="text-xl font-bold mb-6 text-white-soft">
                      <span className="text-gold mr-2">{q.id}.</span> {q.question}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleAnswerSelect(q.id, opt.value)}
                          className={cn(
                            "text-left p-6 rounded-2xl border transition-all duration-200",
                            answers[q.id] === opt.value
                              ? "bg-gold border-gold text-black-rich"
                              : "bg-black-rich border-white/10 text-white-soft/60 hover:border-gold/50"
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-center pt-8">
                  <Button 
                    size="lg"
                    onClick={finishQuiz}
                    disabled={Object.keys(answers).length < quizQuestions.length}
                    className="bg-gold hover:bg-gold/90 text-black-rich font-bold px-12 py-8 text-xl rounded-full"
                  >
                    Generate My Full Profile & Roadmap
                  </Button>
                </div>
              </motion.div>
            )}

            {step === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 flex flex-col items-center"
              >
                {!error ? (
                  <>
                    <div className="relative mb-12">
                       <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-32 h-32 rounded-full border-4 border-gold/20 border-t-gold"
                       />
                       <Brain className="h-12 w-12 text-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold mb-4">Gemini AI is analyzing your data...</h2>
                    <div className="space-y-2 text-muted-foreground animate-pulse">
                      <p>Analyzing behavioral responses...</p>
                      <p>Synthesizing educational milestones...</p>
                      <p>Generating personalized roadmap...</p>
                    </div>
                  </>
                ) : (
                  <div className="max-w-md mx-auto space-y-8">
                    <div className="bg-red-500/10 p-6 rounded-3xl border border-red-500/20">
                      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white-soft mb-2">Generation Failed</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {error}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        onClick={() => generateResult()}
                        className="flex-1 bg-gold hover:bg-gold/90 text-black-rich font-bold py-6 rounded-xl"
                      >
                        Try Again
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setStep("input")}
                        className="flex-1 border-white/10 text-white-soft hover:bg-white/5 py-6 rounded-xl"
                      >
                        Review Form
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-12"
              >
                <div className="bg-gradient-to-br from-gold/20 to-transparent p-12 rounded-[3rem] border border-gold/20 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-gold/10 text-gold px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                      Profile Result
                    </div>
                  </div>
                  <h2 className="text-sm font-bold text-gold uppercase tracking-[0.2em] mb-4">Thinking Style DNA</h2>
                  <h1 className="text-4xl md:text-6xl font-heading font-bold mb-8">{result.profileTitle}</h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
                    {result.profileDescription}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {result.keyStrengths.map((str: string, i: number) => (
                      <div key={i} className="bg-black-rich/40 p-4 rounded-2xl flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-gold" />
                        <span className="font-medium text-sm">{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-dark-grey p-10 md:p-16 rounded-[3rem] border border-white/5">
                  <div className="flex items-center gap-4 mb-12">
                     <div className="bg-gold/10 p-3 rounded-2xl">
                        <Route className="h-8 w-8 text-gold" />
                     </div>
                     <div>
                        <h2 className="text-3xl font-heading font-bold">Personalized Roadmap</h2>
                        <p className="text-muted-foreground">The next 6 months for {formData.name}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {result.roadmap.map((item: any, i: number) => (
                      <div key={i} className="flex gap-6 group">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black-rich font-bold shrink-0 shadow-lg shadow-gold/20 transition-transform group-hover:scale-110">
                            {i + 1}
                          </div>
                          {i < 5 && <div className="w-px h-full bg-gold/20 mt-2" />}
                        </div>
                        <div className="pb-8">
                          <h4 className="font-bold text-lg text-gold mb-2">{item.month}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.milestone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-12 rounded-[3rem] text-black-rich text-center shadow-2xl">
                  <Lightbulb className="h-12 w-12 text-gold mx-auto mb-6" />
                  <h3 className="text-3xl font-heading font-bold mb-4">Coach's Professional Tip</h3>
                  <p className="text-lg italic text-muted-foreground mb-10 max-w-2xl mx-auto font-medium">
                    "{result.coachAdvice}"
                  </p>
                  <div className="h-px bg-black/5 w-full mb-10" />
                  <p className="text-xl font-bold mb-8">Ready to bring this roadmap to life?</p>
                  <Button 
                    size="lg"
                    onClick={onBookTrial}
                    className="bg-gold hover:bg-gold/90 text-black-rich font-bold px-12 py-8 text-xl rounded-full shadow-2xl"
                  >
                    Secure {formData.name}'s Free Trial Now <ChevronRight className="ml-2 h-6 w-6" />
                  </Button>
                  <p className="mt-8 text-sm text-balance text-muted-foreground">
                    Only 4 trial slots remaining for this week. No commitment required.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
