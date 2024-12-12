import { BGLogo } from "@/assets";
import "./globals.css";

export const metadata = {
  title: "Jobsite",
  description: "The best way to score your dream internship.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-y-hidden h-screen">
        {children}
        <div className="flares w-full h-full z-10"></div>
        <BGLogo className="absolute -z-10 top-10 -left-64 h-[100%]" />
      </body>
    </html>
  );
}
