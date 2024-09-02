import type { MetaFunction } from "@remix-run/node";

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
        <div className="gradient-rectangle w-full flex z-10 h-60 rounded-[16px] backdrop-blur-md flex-1 items-center justify-center">
          <h1 className="text-7xl text-white nats-font">
            Let's Find Your Dream Job
          </h1>
        </div>
      </div>
    </>
  );
}
