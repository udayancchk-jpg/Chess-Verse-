/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Benefits from "@/components/landing/Benefits";
import Offer from "@/components/landing/Offer";
import HowItWorks from "@/components/landing/HowItWorks";
import Authority from "@/components/landing/Authority";
import Testimonials from "@/components/landing/Testimonials";
import Results from "@/components/landing/Results";
import BookingSystem from "@/components/landing/BookingSystem";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import ThankYouPage from "@/components/landing/ThankYouPage";
import AboutPage from "@/components/landing/AboutPage";
import GeminiChat from "@/components/landing/GeminiChat";
import AssessmentPage from "@/components/landing/AssessmentPage";

export default function App() {
  const [view, setView] = React.useState<"home" | "about" | "thank-you" | "assessment">("home");
  const [bookingDetails, setBookingDetails] = React.useState<{ date: string; time: string }>();

  const handleBookingSuccess = (details: { date: string; time: string }) => {
    setBookingDetails(details);
    setView("thank-you");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToAbout = () => {
    setView("about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHome = () => {
    setView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToAssessment = () => {
    setView("assessment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBooking = () => {
    if (view !== "home") {
      setView("home");
      setTimeout(() => {
        document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-gold selection:text-black-rich">
      {view === "home" && (
        <>
          <Navbar 
            onAboutClick={navigateToAbout} 
            onHomeClick={navigateToHome} 
            onAssessmentClick={navigateToAssessment}
            onBookTrial={scrollToBooking} 
          />
          <main>
            <Hero onAssessmentClick={navigateToAssessment} />
            <Problem />
            <Benefits />
            <Results />
            <Offer />
            <HowItWorks />
            <Authority />
            <Testimonials />
            <BookingSystem onSuccess={handleBookingSuccess} />
            <FinalCTA />
          </main>
          <Footer 
            onAboutClick={navigateToAbout} 
            onHomeClick={navigateToHome} 
            onAssessmentClick={navigateToAssessment} 
          />
        </>
      )}

      {view === "about" && (
        <AboutPage 
          onBookTrial={scrollToBooking} 
          onBackToHome={navigateToHome} 
        />
      )}

      {view === "assessment" && (
        <AssessmentPage 
          onBookTrial={scrollToBooking} 
          onBackToHome={navigateToHome} 
        />
      )}

      {view === "thank-you" && (
        <ThankYouPage 
          bookingDetails={bookingDetails} 
          onBackToHome={navigateToHome} 
        />
      )}

      <WhatsAppButton />
      <GeminiChat onBookTrial={scrollToBooking} />
      
      {/* Sticky Mobile CTA */}
      {view === "home" && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-black-rich/80 backdrop-blur-md border-t border-white/10 z-40">
          <button 
            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full bg-gold text-black-rich font-bold py-4 rounded-xl shadow-lg"
          >
            Claim Free Trial Now
          </button>
        </div>
      )}
    </div>
  );
}
