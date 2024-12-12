import { SearchBox } from "./SearchBox";
import { GradientBox } from "../assets/GradientBox";

type TopBoxProps = {
  onSearch: (results: any) => void;
  className?: string;
};
export function TopBox({ onSearch, className }: TopBoxProps) {
  return (
    <div className="relative w-full h-auto flex items-center ">
      <GradientBox className="rounded-2xl"></GradientBox>
      <div className="absolute ml-12">
        <h1 className="text-7xl mb-1 text-white header-text_shadow">
          Find Your Dream Job
        </h1>
        <SearchBox onSearch={onSearch} />
      </div>
    </div>
  );
}
