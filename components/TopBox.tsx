import { SearchBox } from "@/components/SearchBox";
import GradientBox from "@/components/GradientBox";
import SignOutButton from "./SignOutButton";

type TopBoxProps = {
  onSearch: (results: any) => void;
  className?: string;
};
export function TopBox({ onSearch, className }: TopBoxProps) {
  return (
    <div className="relative w-full h-auto flex items-center ">
      <GradientBox className="w-full h-[30vh] rounded-3xl flex items-center">
        <div className="absolute flex flex-col h-full items-start justify-center ml-12">
          <h1 className="text-7xl font-normal mb-2 text-white">
            Find Your Dream Job
          </h1>
          <SearchBox onSearch={onSearch} />
        </div>
        <img
          src="/BG.svg"
          className="absolute z-20 -top-40 -right-20 opacity-50"
        />
      </GradientBox>
    </div>
  );
}
