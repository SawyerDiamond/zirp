"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GradientBox from "@/components/GradientBox";
import { BGLogo } from "@/assets/BGLogo";
import { motion } from "framer-motion";
import { ZirpLogo } from "@/assets/ZirpLogo";
export default function Index() {
  return (
    <div className="h-screen overflow-hidden">
      <nav className="flex flex-row justify-between top-0 left-0 right-0 bg-primary border border-primary-border p-2 backdrop-blur rounded-2xl mx-4 mt-4 w-[calc(100%-2rem)]">
        <div className="flex flex-row items-center content-center gap-3">
          <ZirpLogo className="w-10 pl-2 h-10" />
          <div className="flex items-center">
            <h2 className="text-xl leading-none">ZIRP</h2>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <Link href="/sign-in">
              <Button variant="secondary" className="button_transition-white">
                <span className="text-sm font-semibold">Sign In</span>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="gradient" className="ml-auto">
                <span className="text-sm font-semibold">Sign Up</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <main className="h-screen flex flex-row content-center justify-center pb-4">
        <motion.section
          className="w-[55%] h-[calc(100%-3.5rem)] flex flex-col items-center justify-center"
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}>
          <Link href="/app/protected/page.tsx">
            <Badge />
          </Link>

          <h1 className="text-5xl p-4 flex flex-col text-center gap-2">
            <span>Find Your Dream</span> <span>Internship or Co-op</span>{" "}
            <span>With Zirp</span>
          </h1>
          <h3 className="text-md px-2 mb-8 flex flex-col text-center text-gray-300 gap-2 w-[28rem]">
            Scour thousands of student jobs across every industry, role, and
            location. Sign-up to get started, or use guest mode to browse.
          </h3>
        </motion.section>
        <section className="w-[45%] p-4 mb-4 flex items-start justify-end">
          <GradientBox className="w-full h-[94%] rounded-3xl ">
            <motion.img
              src="/screenGrab.webp"
              alt="screen grab"
              className="absolute ml-20 mt-20 z-0 rounded-3xl shadow-xl shadow-blue-950"
              initial={{ opacity: 0, y: 40, x: 40 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.5 }}
            />
          </GradientBox>
        </section>
      </main>
      <BGLogo
        fillColor="#0D1E3D"
        className="absolute -z-20 -top-32 -left-28 opacity-50"
      />
    </div>
  );
}
