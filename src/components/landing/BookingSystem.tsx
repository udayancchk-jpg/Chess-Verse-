import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, User, Phone, GraduationCap, ChevronRight, AlertCircle, Trophy, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "motion/react";

const timeSlots = [
  "10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM", "07:30 PM"
];

interface BookingSystemProps {
  onSuccess?: (details: { date: string; time: string }) => void;
}

export default function BookingSystem({ onSuccess }: BookingSystemProps) {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<string>();
  const [level, setLevel] = React.useState<string>();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !time || !level) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("date", format(date, "PPP"));
    formData.append("time", time);
    formData.append("level", level);

    try {
      const response = await fetch("https://formspree.io/f/xaqannvz", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        if (onSuccess) {
          onSuccess({
            date: format(date, "PPP"),
            time: time
          });
        }
      } else {
        const data = await response.json();
        setError(data.errors?.[0]?.message || "Something went wrong. Please try again later.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      console.error("Error submitting form:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-white-soft text-black-rich scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-border flex flex-col lg:flex-row">
          
          {/* Left Side: Info */}
          <div className="lg:w-2/5 bg-black-rich p-10 text-white-soft flex flex-col">
            <h2 className="text-3xl font-heading font-bold mb-6 text-gold">Secure Your Slot</h2>
            <p className="text-muted-foreground mb-10">
              Only 4 trial slots remaining for this week. Book now to avoid waiting.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-gold/20 p-2 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="font-bold">Limited Availability</p>
                  <p className="text-sm text-muted-foreground text-balance">We only take 10 new trial students per week to ensure quality.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-gold/20 p-2 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="font-bold">Expert Assessment</p>
                  <p className="text-sm text-muted-foreground">Get a detailed report on your child's current chess level.</p>
                </div>
              </div>
            </div>

            <div className="mt-auto p-6 bg-dark-grey rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 rounded-full border-2 border-dark-grey" alt="User" />
                  ))}
                </div>
                <p className="text-xs font-bold text-gold">JOINED TODAY</p>
              </div>
              <p className="text-sm">Arjun and 12 others booked their trial today.</p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-3/5 p-10 relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gold" /> Parent/Student Name
                      </Label>
                      <Input id="name" name="name" placeholder="Enter your name" required className="rounded-xl border-border focus:ring-gold" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gold" /> Phone Number
                      </Label>
                      <Input id="phone" name="phone" type="tel" placeholder="Enter phone number" required className="rounded-xl border-border focus:ring-gold" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="age" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-gold" /> Child's Age
                      </Label>
                      <Input id="age" name="age" type="number" placeholder="e.g. 8" required className="rounded-xl border-border focus:ring-gold" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level" className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-gold" /> Skill Level
                      </Label>
                      <Select required onValueChange={setLevel} value={level}>
                        <SelectTrigger className="rounded-xl border-border focus:ring-gold">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Absolute Beginner</SelectItem>
                          <SelectItem value="intermediate">Knows Basic Moves</SelectItem>
                          <SelectItem value="advanced">Rated/Tournament Player</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-gold" /> Preferred Date
                      </Label>
                      <Popover>
                        <PopoverTrigger
                          className={cn(
                            buttonVariants({ variant: "outline" }),
                            "w-full justify-start text-left font-normal rounded-xl border-border",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gold" /> Preferred Time
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={cn(
                              "text-[10px] py-2 rounded-lg border transition-all",
                              time === slot 
                                ? "bg-gold border-gold text-black-rich font-bold" 
                                : "bg-white border-border text-muted-foreground hover:border-gold/50"
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 text-red-600 text-sm"
                    >
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <p>{error}</p>
                    </motion.div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gold hover:bg-gold/90 text-black-rich font-bold py-7 text-lg rounded-xl shadow-xl shadow-gold/10 group"
                  >
                    {isLoading ? "Processing..." : "Secure My Slot Now"}
                    {!isLoading && <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    By clicking, you agree to our terms and will receive a WhatsApp confirmation.
                  </p>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-heading font-bold">Booking Confirmed!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    We've received your request. Our team will contact you on WhatsApp within 2 hours to confirm your slot.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                    className="rounded-full border-gold text-gold"
                  >
                    Book another slot
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
