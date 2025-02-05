import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "L'Assiette Futée v1",
  description: "Compose et fais toi livrer tes assiettes préférées !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${mulish.className} bg-zinc-950 flex justify-center items-center h-screen`}
      >
        <div className="w-[375px] h-[667px] bg-white shadow-lg rounded-xl overflow-hidden text-zinc-950">
          {children}
        </div>
      </body>
    </html>
  );
}
