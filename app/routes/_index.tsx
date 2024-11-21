import { Button } from "~/components/ui/button";
import { Link } from "react-router-dom";
import { GradientBox, JobsiteLogo } from "~/assets";
import { SubmitSVG } from "~/assets/icons";
export default function Index() {
  return (
    <div className="h-screen overflow-y-hidden">
      <div className="flex flex-row absolute items-center pl-8 pt-8">
        <JobsiteLogo className="w-12 h-12" />
      </div>
      <div className="h-screen content-center justify-center">
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-7xl p-4">Find Your Dream Job Today!</h1>
          <div className="flex flex-row items-center gap-4">
            <Link to="/dashboard">
              <Button className="ml-auto pl-6 pr-6 flex items-center rounded-lg bg-white text-black">
                <span className="text-xl">Sign In</span>
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="ml-auto pl-8 pr-8 flex items-center rounded-lg bluePurpleGradient">
                <span className="text-xl">Sign Up</span>
                <SubmitSVG className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 h-full w-full bg-[var(--primaryBG)] bg-[radial-gradient(#0c1e3a_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </div>
  );
}
