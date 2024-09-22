import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Jobsite - Find Your Dream Job" },
    {
      name: "description",
      content: "Welcome to Jobsite - Find Your Dream Job!",
    },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Welcome to Jobsite</h1>
      <p>Find your dream job today!</p>
    </div>
  );
}
