import type { MetaFunction } from "@remix-run/node";
import { Background, TopBox } from "~/assets";
import { Navbar } from "~/components/navbar";
export const meta: MetaFunction = () => {
  return [
    { title: "Jobsite" },
    { name: "description", content: "Find Your Dream Job!" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="m-3 overflow-hidden">
        <TopBox />
        <Navbar />
        <Background />
      </div>
    </>
  );
}
