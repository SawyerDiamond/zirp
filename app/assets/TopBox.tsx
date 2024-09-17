import { SearchBox } from "../components/searchbox";
import { GradientBox } from "./GradientBox";

export function TopBox() {
  return (
    <GradientBox className="w-full h-60 rounded-2xl">
      <h1 className="text-7xl mb-1 text-white nats-font">
        Let's Find Your Dream Job
      </h1>
      <SearchBox onSearch={() => {}} />
    </GradientBox>
  );
}
