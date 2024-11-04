import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp } from "@clerk/remix";
import { json, MetaFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Jobsite - Find Your Dream Job" },
    {
      name: "description",
      content: "Welcome to Jobsite - Find Your Dream Job!",
    },
  ];
};

const envData = {
  JSEARCH_API_KEY: process.env.JSEARCH_API_KEY || window.env.JSEARCH_API_KEY,
  LOGO_DEV_PUBLIC_KEY:
    process.env.LOGO_DEV_PUBLIC_KEY || window.env.LOGO_DEV_PUBLIC_KEY,
};

export const loader: LoaderFunction = (args) => rootAuthLoader(args);

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(envData)}`,
          }}
        />
      </body>
    </html>
  );
}

export default ClerkApp(App, {
  publishableKey: "pk_test_ZXBpYy1zYWxtb24tMjguY2xlcmsuYWNjb3VudHMuZGV2JA",
});
