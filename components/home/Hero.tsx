import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-4xl font-bold text-center pt-12">Des repas <br /> sur-mesure</h1>
            <p className="text-center pt-4 px-12 text-gray-600 text-sm">Une assiette saine pour chaque repas.</p>
            <Image className="pt-4" src="/assets/plate.png" alt="Hero" width={200} height={1000} />
            <Button className="mt-6 px-8 py-6 text-md font-bold">Commander maintenant</Button>
        </div>
    )
}

export default Hero;