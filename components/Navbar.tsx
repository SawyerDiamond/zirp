import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ZirpLogo } from "@/assets/ZirpLogo";

export const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between top-0 left-0 right-0 bg-primary border border-primary-border p-2 backdrop-blur rounded-2xl mx-4 mt-4 w-[calc(100%-2rem)]">
      <div className="flex flex-row items-center content-center gap-3">
        <ZirpLogo className="w-10 pl-2 h-10" />
        <div className="flex items-center">
          <h2 className="text-xl leading-none">ZIRP</h2>
        </div>
      </div>
      <div>
        <Link href="/sign-up">
          <Button variant="gradient" className="ml-auto">
            <span className="text-sm font-semibold">Get Started</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
};
