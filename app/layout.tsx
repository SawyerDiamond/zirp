import "./globals.css";
import Head from "next/head";
export const metadata = {
  title: "Zirp",
  description: "The best way to score your dream internship.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link
          rel="preload"
          href="/font/NATS-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/font/Gilroy-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body className="overflow-hidden h-screen">
        {children}
        <div className="flares w-full h-full -z-10"></div>
        <img
          src="/BG.svg"
          className="absolute -z-20 -top-32 -left-28 opacity-50"
        />
      </body>
    </html>
  );
}
