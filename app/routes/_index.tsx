import type { MetaFunction } from "@remix-run/node";
import { Navbar } from "~/components/navbar";
import { SearchBox } from "~/components/searchbox";
export const meta: MetaFunction = () => {
  return [
    { title: "Jobsite" },
    { name: "description", content: "Find Your Dream Job!" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="w-full h-full">
        <div className="gradient-rectangle w-full flex flex-col z-10 h-60 rounded-2xl flex-1 items-start pl-10 justify-center">
          <h1 className="text-7xl text-white nats-font ">
            Let's Find Your Dream Job
          </h1>
          <SearchBox onSearch={() => {}} />
        </div>
        <Navbar />
      </div>
    </>
  );
}
