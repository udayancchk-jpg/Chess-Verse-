import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sandeep Verma",
    role: "Parent of 8-year-old",
    content: "My son used to be very hyperactive. Since joining Chess Verse, his focus has improved drastically. He can now sit and concentrate for an hour easily.",
    rating: 5
  },
  {
    name: "Anjali Gupta",
    role: "Parent of 12-year-old",
    content: "The coaches are very patient. My daughter went from a complete beginner to winning her first school tournament in just 4 months. Highly recommended!",
    rating: 5
  },
  {
    name: "Rahul K.",
    role: "Student (Age 15)",
    content: "I love the way they explain complex strategies. The personalized roadmap helped me increase my FIDE rating by 200 points in a single season.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white-soft text-black-rich">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Trusted by <span className="text-gold italic">500+ Families</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real stories from parents and students who transformed their thinking with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="h-12 w-12 text-gold" />
              </div>
              <CardContent className="pt-10 pb-8 px-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-lg italic mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-bold text-black-rich">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
