import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TextAnimate } from "@/components/ui/text-animate";
export const Hero = () => {
  return (
    <section className="w-[55%] h-[calc(100%-3.5rem)] flex flex-col items-center justify-center">
      <Link href="/app/protected/page.tsx">
        <Badge />
      </Link>

      <TextAnimate
        animation="slideUp"
        by="word"
        className="text-5xl font-semibold font-[NATS] w-[32rem] p-4 text-center leading-[1.2]">
        Find Your Dream Internship or Co-op With ZIRP
      </TextAnimate>
      <h3 className="text-md px-2 mb-8 flex flex-col text-center text-gray-300 gap-2 w-[28rem]">
        Scour thousands of student jobs across every industry, role, and
        location. Sign-up to get started, or use guest mode to browse.
      </h3>
    </section>
  );
};
