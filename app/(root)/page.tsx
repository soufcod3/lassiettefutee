import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import BottomBar from "@/components/shared/BottomBar";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function Home() {
  return (
      <div className="bg-background relative">
        <Navbar />
        <Hero />
        <Featured />
        <Footer />
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            variant="outline"
            size="lg"
            className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          >
            <PlusIcon className="h-6 w-6" />
            <span className="sr-only">Add</span>
          </Button>
        </div>
      </div>
  );
}
