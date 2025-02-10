import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from '@clerk/localizations'


const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "L'Assiette Futée - Compose ton assiette sur-mesure qui fait du bien à ton corps",
  description: "Compose ton assiette sur-mesure et fais toi livrer tes assiettes préférées !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="fr">
        <body
          className={`${mulish.className} bg-zinc-950 flex justify-center items-center h-screen text-zinc-950`}
        >
          <div className="w-full h-screen sm:max-w-[375px] sm:h-[667px] sm:mx-auto sm:shadow-lg sm:rounded-xl bg-white overflow-scroll">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
