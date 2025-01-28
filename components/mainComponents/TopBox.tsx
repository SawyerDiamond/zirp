import { SearchBox } from "@/components/mainComponents/SearchBox";
import GradientBox from "@/components/GradientBox";
import { BGLogo } from "@/assets/BGLogo";
import { ZirpLogoB } from "@/assets/ZirpLogo";
import { SearchBoxProps } from "@/types/job";

export function TopBox({ onSearch, className }: SearchBoxProps) {
  return (
    <div className="relative w-full h-auto flex items-center z-30 ">
      <GradientBox className="w-full h-[30vh] rounded-3xl flex items-center">
        <div className="absolute flex flex-col h-full items-start justify-center ml-12">
          <h1 className="text-7xl font-normal mb-2 text-white">
            Find Your Dream Internship
          </h1>
          <SearchBox onSearch={onSearch} />
        </div>

        <BGLogo
          fillColor="#FFFFFF"
          className="absolute z-20 top-[-27.5rem] rotate-[42.5deg] scale-50 right-[-25rem] opacity-10"
        />
      </GradientBox>
      <div className="absolute top-4 right-6 flex flex-row items-center content-center gap-2">
        <ZirpLogoB className="w-10 pl-2 h-10" />
        <div className="flex items-center">
          <h2 className="text-xl leading-none">ZIRP</h2>
        </div>
      </div>
    </div>
  );
}
