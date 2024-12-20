"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobsiteLogo } from "@/assets";
import { motion } from "framer-motion";
export default function Index() {
  return (
    <div className="h-screen overflow-hidden">
      <nav className="flex flex-row justify-between top-0 left-0 right-0 bg-primary border border-primary-border p-2 backdrop-blur rounded-2xl mx-4 mt-4 w-[calc(100%-2rem)]">
        <div className="flex flex-row items-center gap-3">
          <JobsiteLogo className="w-10 pl-2 h-10" />
          <h2 className="text-xl">Zirp</h2>
        </div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <Link href="/sign-in">
              <Button variant="secondary" className="button_transition-white">
                <span className="text-sm">Sign In</span>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="gradient" className="ml-auto">
                <span className="text-sm">Sign Up</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <main className="h-screen flex flex-row content-center justify-center pb-4">
        <section className="w-[55%] h-[calc(100%-3.5rem)] flex flex-col items-center justify-center ">
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
        </section>
        <section className="w-[45%] p-4 mb-4 flex items-start justify-end">
          <div className="w-full h-[94%] rounded-3xl gradient-background relative overflow-hidden">
            <div
              className="border border-transparent rounded-3xl w-full h-full"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <motion.img
                src="/screenGrab.webp"
                alt="screen grab"
                className="absolute ml-20 mt-20 z-0 rounded-3xl shadow-xl shadow-blue-950"
                initial={{ opacity: 0, y: 40, x: 40 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
