import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div className="bg-background">
      <Navbar />
      <Hero />
      <Featured />
      <Footer />
    </div>
  );
}
