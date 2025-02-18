"use client";

import { useState } from "react";
import { Card } from "../ui/card";

import Image from "next/image";

const Plate = () => {
    return (
        <div className="">
            <Ingredients />
        </div>
    )
}

export default Plate;


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
                    {ingredients[selectedCategory].map((ingredient, index) => (
                        <div key={index} className="flex flex-col items-center justify-center">
                            <Card className="rounded-md aspect-square flex items-center justify-center w-20 h-20">
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