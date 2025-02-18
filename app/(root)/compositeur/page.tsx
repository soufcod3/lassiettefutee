import PlateCompositor from "@/components/compositeur/PlateCompositor";
import AdBanner from "@/components/shared/AdBanner";
import DrawerComponent from "@/components/shared/DrawerComponent";
import Navbar from "@/components/shared/Navbar";

export default function Compositeur() {
    return (
        <div className="bg-background">
            <Navbar />
            <AdBanner />
            <PlateCompositor />
            <DrawerComponent />
      </div>
    )
}
