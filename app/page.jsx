import Navbar from "@/components/Navbar";
import AboutUsSection from "@/Pages/Homepage/About-us";
import StatsSection from "@/Pages/Homepage/Animated";
import HeroSection from "@/Pages/Homepage/HeroSection";
import OurServices from "@/Pages/Homepage/OurServices";
import Project from "@/Pages/Homepage/Projects";
import ServicesSection from "@/Pages/Homepage/Secondsec";
import { AnimatedTestimonialsDemo } from "@/Pages/Homepage/Testimonial";
import Image from "next/image";

export default function Home() {
  return (
     <>
      <HeroSection/>
      <ServicesSection/>
      <AboutUsSection/>
      <StatsSection/>
      <OurServices/>
      <Project/>
      <AnimatedTestimonialsDemo/>
     </>
  );
}
