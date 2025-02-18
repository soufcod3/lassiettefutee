"use client";

import { useState } from "react";
import { Card } from "../ui/card";

import Image from "next/image";
import { TiRefresh } from "react-icons/ti";
import { TbArrowBackUp } from "react-icons/tb";




const PlateCompositor = () => {
    return (
        <div className="flex flex-col items-center">
            <Ingredients />
            <div className="flex justify-center items-center gap-1">
                <ResetButton />
                <Plate />
                <BackButton />
            </div>
        </div>
    );
};


export default PlateCompositor;


const Ingredients = () => {

    const [selectedCategory, setSelectedCategory] = useState<string>("Nos Viandes");

    const ingredients = {
        "Nos Viandes": [
            { "name": "Boeuf", "image": "/assets/ingredients/tenders.png" },
            { "name": "Poisson", "image": "/assets/ingredients/tenders.png" }
        ],
        "Nos Pâtes": [
            { "name": "Pâtes", "image": "/assets/ingredients/tenders.png" },
            { "name": "Riz", "image": "/assets/ingredients/tenders.png" },
            { "name": "Pâtes", "image": "/assets/ingredients/tenders.png" }
        ],
        "Nos Légumes": [
            { "name": "Tomate", "image": "/assets/ingredients/tenders.png" },
            { "name": "Oignon", "image": "/assets/ingredients/tenders.png" },
            { "name": "Patates", "image": "/assets/ingredients/tenders.png" },
            { "name": "Carotte", "image": "/assets/ingredients/tenders.png" },
            { "name": "Tomate", "image": "/assets/ingredients/tenders.png" },
            { "name": "Oignon", "image": "/assets/ingredients/tenders.png" },
            { "name": "Patates", "image": "/assets/ingredients/tenders.png" },
            { "name": "Carotte", "image": "/assets/ingredients/tenders.png" }
        ]
    };

    return (
        <>
            <div className="flex gap-3 justify-center my-3">
                {Object.keys(ingredients).map((category, index) => (
                    <small key={index} className={`flex ${selectedCategory === category ? "font-semibold" : ""}`} onClick={() => setSelectedCategory(category)}>{category}</small>
                ))}
            </div>
            {/* Carousel des ingrédients */}
            <div className="flex justify-center">
                <div className="flex gap-3 overflow-x-auto px-5 pb-3">
                    {ingredients[selectedCategory as keyof typeof ingredients].map((ingredient, index) => (
                        <div key={index} className="flex flex-col items-center justify-center">
                            <Card className="rounded-md aspect-square flex items-center justify-center w-20 h-20 bg-white border-gray-200 shadow-sm">
                                <Image src={ingredient.image} alt={ingredient.name} width={70} height={70} />
                            </Card>
                            <p className="text-center text-sm my-1">{ingredient.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

const Plate = () => {

    const [selectedComp, setSelectedComp] = useState<number | null>(null);


    return (
        <div className="plate-container mx-auto flex justify-center items-center relative aspect-[4/3] min-w-[210px] bg-zinc-900 rounded-xl px-1">
            {/* if comp is selected, border-2 border-zinc-300 */}
            <div
                className={`${selectedComp === 1 ? "border-2 border-zinc-300" : ""} absolute top-2 left-2 comp-1 h-[30%] w-[70%] bg-zinc-700 rounded-sm rounded-tl-xl flex items-center justify-center`}
                onClick={() => setSelectedComp(1)}
                role="button">
                <small className="text-gray-300 text-md">1</small>
            </div>
            <div
                className={`${selectedComp === 2 ? "border-2 border-zinc-300" : ""} absolute top-2 right-2 comp-2 h-[30%] w-[20%] bg-zinc-700 rounded-sm rounded-tr-xl flex items-center justify-center`}
                onClick={() => setSelectedComp(2)}
                role="button">
                <small className="text-gray-300 text-md">2</small>
            </div>
            <div
                className={`${selectedComp === 3 ? "border-2 border-zinc-300" : ""} absolute bottom-2 left-2 comp-3 h-[55%] w-[25%] bg-zinc-700 rounded-sm rounded-bl-xl flex items-center justify-center`}
                onClick={() => setSelectedComp(3)}
                role="button">
                <small className="text-gray-300 text-md">3</small>
            </div>
            <div
                className={`${selectedComp === 4 ? "border-2 border-zinc-300" : ""} absolute bottom-2 left-17 comp-4 h-[55%] w-[38%] bg-zinc-700 rounded-sm flex items-center justify-center`}
                onClick={() => setSelectedComp(4)}
                role="button">
                <small className="text-gray-300 text-md">4</small>
            </div>
            <div
                className={`${selectedComp === 5 ? "border-2 border-zinc-300" : ""} absolute bottom-2 right-2 comp-5 h-[55%] w-[25%] bg-zinc-700 rounded-sm rounded-br-xl flex items-center justify-center`}
                onClick={() => setSelectedComp(5)}
                role="button">
                <small className="text-gray-300 text-md">5</small>
            </div>
        </div>
    )
}

const ResetButton = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <TiRefresh className="w-6 h-6" />
            <p className="text-xs">Annuler</p>
        </div>
    )
}

const BackButton = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <TbArrowBackUp className="w-6 h-6" />
            <p className="text-xs">Retour</p>
        </div>
    )
}