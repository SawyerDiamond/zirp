import { Button } from "~/components/ui/button";
import { Link } from "react-router-dom";
import { GradientBox, JobsiteLogo } from "~/assets";
import { SubmitSVG } from "~/assets/icons";
export default function Index() {
  return (
    <div>
      <div className="flex flex-row items-center m-8">
        <JobsiteLogo className="w-12 h-12" />
        <Link to="/dashboard">
          <Button className="ml-auto pl-8 pr-8 flex items-center rounded-lg bluePurpleGradient">
            <span className="text-xl">GO</span>
            <SubmitSVG className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <p>Find your dream job today!</p>
      <GradientBox className="w-96" />
      <div className="absolute inset-0 -z-10 h-full w-full bg-[var(--primaryBG)] bg-[radial-gradient(#0c1e3a_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </div>
  );
}
