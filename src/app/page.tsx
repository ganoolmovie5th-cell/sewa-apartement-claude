import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedListings from "@/components/home/FeaturedListings";
import CitySection from "@/components/home/CitySection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SewaApartement – Platform Sewa Apartemen #1 JABODETABEK",
  description: "Temukan apartemen impian Anda di JABODETABEK. 2.940+ listing terpercaya untuk mahasiswa, pekerja, dan keluarga.",
};

export default function HomePage() {
  return (
    <div className="page-dark">
      <HeroSection />
      <StatsSection />
      <FeaturedListings />
      <CitySection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
