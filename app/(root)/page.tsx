import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import BottomBar from "@/components/shared/BottomBar";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
      <div className="bg-background relative">
        <Navbar />
        <Hero />
        <Featured />
        <Footer />
        <div className="sticky h-20 w-20 bg-red-500 bottom-2 right-2 ml-auto">
          
        </div>
      </div>
  );
}
