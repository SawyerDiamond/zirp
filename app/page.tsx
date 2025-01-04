"use client";
import { BGLogo } from "@/assets/BGLogo";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/landingComponents/Hero";
import { DisplayCard } from "@/components/landingComponents/DisplayCard";
export default function Index() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <main className="h-screen flex flex-row content-center justify-center pb-4">
        <Hero />
        <DisplayCard />
      </main>
      <BGLogo
        fillColor="#0D1E3D"
        className="absolute -z-20 -top-32 -left-28 opacity-50"
      />
    </div>
  );
}
