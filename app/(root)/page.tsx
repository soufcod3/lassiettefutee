import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import FloatingMenu from "@/components/shared/FloatingMenu";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <div className="bg-background relative">
        <Navbar />
        <Hero />
        <Featured />
        <Footer />
        <FloatingMenu />
      </div>
    </Suspense>
  );
}
