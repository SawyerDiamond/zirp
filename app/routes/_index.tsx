import type { MetaFunction } from "@remix-run/node";
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
      <div>
        <h1>Jobsite</h1>
      </div>
    </>
  );
}
