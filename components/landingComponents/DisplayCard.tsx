import { motion } from "framer-motion";
import GradientBox from "../GradientBox";
import { SparklesCore } from "../ui/sparkles";
export const DisplayCard = () => {
  return (
    <section className="w-[45%] p-4 mb-4 flex items-start justify-end">
      <GradientBox className="w-full h-[94%] rounded-3xl ">
        <motion.img
          src="/screenGrab.webp"
          alt="screen grab"
          className="absolute ml-20 mt-20 z-10 rounded-3xl shadow-xl shadow-blue-950"
          initial={{ opacity: 0, y: 40, x: 40 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 1 }}
        />
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </GradientBox>
    </section>
  );
};
