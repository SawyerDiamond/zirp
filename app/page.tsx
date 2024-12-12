"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JobsiteLogo } from "@/assets";
import { SubmitSVG } from "@/assets/icons";
import { motion } from "framer-motion";

export default function Index() {
  const images = [
    { src: "/shadow1.svg", alt: "Shadow 1", delay: 0.2 },
    { src: "/shadow2.svg", alt: "Shadow 2", delay: 0.4 },
    { src: "/shadow3.svg", alt: "Shadow 3", delay: 0.6 },
    { src: "/screenGrab.webp", alt: "Screengrab", delay: 0 },
  ];

  return (
    <div className="h-screen overflow-hidden">
      <nav className="flex flex-row justify-between top-0 left-0 right-0 bg-primary border-primary-border border p-2 backdrop-blur rounded-2xl mx-4 mt-4 w-[calc(100%-2rem)]">
        <JobsiteLogo className="w-10 pl-2 h-10" />
        <div>
          <div className="flex flex-row items-center gap-4">
            <Link href="/sign-in">
              <Button variant="secondary">
                <span className="text-sm">Sign In</span>
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="gradient" className="ml-auto">
                <span className="text-sm">Sign Up</span>
                <SubmitSVG className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <main className="h-screen flex flex-row content-center justify-center pb-4">
        <section className="w-[55%] flex flex-col items-center justify-center ">
          <Link href="/app/protected/page.tsx">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg p-2">
              <Button className="bg-transparent hover:gradient">
                Browse as Guest
              </Button>
            </motion.div>
          </Link>

          <h1 className="text-5xl p-4 flex flex-col text-center gap-2">
            <span>Find Your Dream</span> <span>Internship or Co-op</span>{" "}
            <span>With Jobsite</span>
          </h1>
          <h3 className="text-md px-2 mb-8 flex flex-col text-center text-gray-300 gap-2 w-[28rem]">
            Scour thousands of student jobs across every industry, role, and
            location. Sign-up to get started, or use guest mode to browse.
          </h3>
        </section>
        <section className="w-[45%] p-4 mb-4 flex items-start justify-end">
          <div className="w-full h-[94%] rounded-3xl gradient overflow-hidden relative">
            <div
              className="border-2 border-transparent rounded-3xl flex justify-end w-full h-full overflow-hidden"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
              {images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="absolute w-[79%]"
                  initial={{ opacity: 0, y: 20 + index * 25, x: -10 * index }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: image.delay, duration: 0.5 }}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
