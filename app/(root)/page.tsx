"use client"
import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import FloatingMenu from "@/components/shared/FloatingMenu";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Suspense, useEffect } from "react";

export default function Home() {

  // log next clerk publishable key
  console.log('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
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
