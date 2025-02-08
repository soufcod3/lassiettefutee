import Image from "next/image";
import PlateCard from "../cards/PlateCard";
import { plates } from "@/constants";

const Featured = () => {
    return (
        <div className="flex flex-col items-center justify-center py-8">
            <h1 className="text-2xl font-bold text-center">Nos assiettes</h1>
            <p className="text-center px-12 text-gray-500 text-sm">prêtes à être dégustées</p>
            <div className="featured-plates flex flex-wrap gap-2 justify-center items-center mt-4">
                {
                    plates.map((plate) => (
                        <PlateCard key={plate.id} name={plate.name} price={plate.price} rating={plate.rating} image={plate.image} veggie={plate.veggie} />
                    ))
                }
            </div>
        </div>
    )
}

export default Featured;