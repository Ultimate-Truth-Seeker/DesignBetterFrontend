import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LandingSearch from "@/components/DesignSearch";
import Footer from "@/components/Footer";
import Showcase from "@/components/Showcase";
import Cta from "@/components/CTA";


export default function Home() {
  return (
    <>
     <Navbar />
     <Hero />
    <LandingSearch/>
    <Showcase/>
    <Cta/>
    <Footer/>
    </>
  );
}
