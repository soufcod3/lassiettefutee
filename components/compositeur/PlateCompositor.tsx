"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";

import Image from "next/image";
import { TiRefresh } from "react-icons/ti";
import { TiArrowBack } from "react-icons/ti";


const PlateCompositor = () => {
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
    const [selectedComp, setSelectedComp] = useState<number | null>(null);
    const plateRef = useRef<HTMLDivElement | null>(null);

    const [plate, setPlate] = useState<{ [key: number]: string | null }>({
        1: null,
        2: null,
        3: null,
        4: null,
        5: null
    })

    const addIngredientToComp = (comp: number, ingredient: string) => {
        // get how many of the same ingredient are on the plate
        const ingredientCount = Object.values(plate).filter((item: string | null) => item === ingredient).length;
        if (ingredientCount < 2) {
            console.log("adding ingredient to comp", ingredient, comp);
            setPlate(prev => ({ ...prev, [comp]: ingredient }));
            setSelectedIngredient(null);
            setSelectedComp(null);
        } else {
            setSelectedIngredient(null);
            setSelectedComp(null);
            console.warn("You can't add more than 2 of the same ingredient");
        }
    }

    useEffect(() => {
        if (selectedIngredient && selectedComp) {
            console.log("adding ingredient");
            addIngredientToComp(selectedComp, selectedIngredient);
        }
    }, [selectedIngredient, selectedComp]);

    useEffect(() => {
        console.log('plate', plate);
    }, [plate])

    // If the click target is doesnt have class ingredient or comp, reset the selected ingredient and comp
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".ingredient") && !target.closest(".comp") && !target.closest(".category")) {
                setSelectedIngredient(null);
                setSelectedComp(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);


    return (
        <div className="flex flex-col items-center">
            <Ingredients selectedIngredient={selectedIngredient} setSelectedIngredient={setSelectedIngredient} setSelectedComp={setSelectedComp} />
            <div className="flex justify-center items-center gap-2">
                <div className="flex flex-col items-center justify-center" role="button" onClick={() => console.log("Annuler")}>
                    <TiRefresh className="w-6 h-6" />
                    <p className="text-xs font-semibold">Annuler</p>
                </div>


                <div ref={plateRef} className="plate-container mx-auto flex justify-center items-center relative aspect-[4/3] min-w-[210px] bg-zinc-900 rounded-xl px-1">
                    {/* if comp is selected, border-2 border-zinc-300 */}
                    <div
                        className={`${!selectedIngredient && selectedComp === 1 ? "selected-comp" : ""} comp absolute top-2 left-2 comp-1 h-[30%] w-[70%] bg-zinc-700 rounded-sm rounded-tl-xl flex items-center justify-center`}
                        onClick={() => setSelectedComp(1)}
                        role="button">
                        <small className="text-gray-300 text-md">{plate[1] || "1"}</small>
                    </div>
                    <div
                        className={`${!selectedIngredient && selectedComp === 2 ? "selected-comp" : ""} comp absolute top-2 right-2 comp-2 h-[30%] w-[20%] bg-zinc-700 rounded-sm rounded-tr-xl flex items-center justify-center`}
                        onClick={() => setSelectedComp(2)}
                        role="button">
                        <small className="text-gray-300 text-md">{plate[2] || "2"}</small>
                    </div>
                    <div
                        className={`${!selectedIngredient && selectedComp === 3 ? "selected-comp" : ""} comp absolute bottom-2 left-2 comp-3 h-[55%] w-[25%] bg-zinc-700 rounded-sm rounded-bl-xl flex items-center justify-center`}
                        onClick={() => setSelectedComp(3)}
                        role="button">
                        <small className="text-gray-300 text-md">{plate[3] || "3"}</small>
                    </div>
                    <div
                        className={`${!selectedIngredient && selectedComp === 4 ? "selected-comp" : ""} comp absolute bottom-2 left-17 comp-4 h-[55%] w-[38%] bg-zinc-700 rounded-sm flex items-center justify-center`}
                        onClick={() => setSelectedComp(4)}
                        role="button">
                        <small className="text-gray-300 text-md">{plate[4] || "4"}</small>
                    </div>
                    <div
                        className={`${!selectedIngredient && selectedComp === 5 ? "selected-comp" : ""} comp absolute bottom-2 right-2 comp-5 h-[55%] w-[25%] bg-zinc-700 rounded-sm rounded-br-xl flex items-center justify-center`}
                        onClick={() => setSelectedComp(5)}
                        role="button">
                        <small className="text-gray-300 text-md">{plate[5] || "5"}</small>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center" role="button" onClick={() => console.log("Retour")}>
                    <TiArrowBack className="w-6 h-6" />
                    <p className="text-xs font-semibold">Retour</p>
                </div>
            </div>
        </div>
    );
};


export default PlateCompositor;


const Ingredients = ({ selectedIngredient, setSelectedIngredient, setSelectedComp }: { selectedIngredient: string | null, setSelectedIngredient: (ingredient: string | null) => void, setSelectedComp: (comp: number | null) => void }) => {

    const [selectedCategory, setSelectedCategory] = useState<string>("Nos Viandes");

    useEffect(() => {
        console.log('selectedIngredient', selectedIngredient);
    }, [selectedIngredient]);

    const ingredients = {
        "Nos Viandes": [
            { name: "Boeuf", image: "/assets/ingredients/tenders.png", stock: 10 },
            { name: "Poisson", image: "/assets/ingredients/tenders.png", stock: 10 }
        ],
        "Nos Pâtes": [
            { name: "Pâtes", image: "/assets/ingredients/tenders.png", stock: 10 },
            { name: "Riz", image: "/assets/ingredients/tenders.png", stock: 10 },
            { name: "Pâtes", image: "/assets/ingredients/tenders.png", stock: 10 }
        ],
        "Nos Légumes": [
            { name: "Tomates", image: "/assets/ingredients/tenders.png", stock: 10 },
            { name: "Oignons", image: "/assets/ingredients/tenders.png", stock: 10 },
            { name: "Patates", image: "/assets/ingredients/tenders.png", stock: 10 },
            { name: "Carottes", image: "/assets/ingredients/tenders.png", stock: 10 },
            { name: "Tomates", image: "/assets/ingredients/tenders.png", stock: 10 },
            { name: "Oignons", image: "/assets/ingredients/tenders.png", stock: 10 },
            { name: "Patates", image: "/assets/ingredients/tenders.png", stock: 10 },
            { name: "Carottes", image: "/assets/ingredients/tenders.png", stock: 10 },
        ]
    };

    // If category changes, reset selected ingredient
    // useEffect(() => {
    //     setSelectedIngredient(null);
    //     setSelectedComp(null);
    // }, [selectedCategory]);

    return (
        <>
            {/* Categories */}
            <div className="category flex gap-3 justify-center my-3">
                {Object.keys(ingredients).map((category, index) => (
                    <small key={index} className={`flex ${selectedCategory === category ? "font-semibold" : ""}`} onClick={() => setSelectedCategory(category)} role="button">{category}</small>
                ))}
            </div>
            {/* Ingredients */}
            <div className="flex justify-center w-full">
                <div className="flex gap-3 overflow-x-auto px-5 pb-3">
                    {ingredients[selectedCategory as keyof typeof ingredients].map((ingredient, index) => (
                        <div key={index} className="ingredient flex flex-col items-center justify-center" onClick={() => setSelectedIngredient(ingredient.name)} role="button">
                            <Card className={`rounded-md aspect-square flex items-center justify-center w-20 h-20 bg-white border-gray-200 shadow-sm ${selectedIngredient === ingredient.name ? "selected-ingredient" : ""}`}>
                                <Image src={ingredient.image} alt={ingredient.name} width={70} height={70} />
                            </Card>
                            <p className="text-center text-xs my-1">{ingredient.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

const Plate = () => {

    const [selectedComp, setSelectedComp] = useState<number | null>(null);
    const plateRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            // Don't unselect if clicking on an ingredient or inside an ingredient
            if (target.closest(".ingredient")) return;

            // Unselect if clicking outside the Plate
            if (plateRef.current && !plateRef.current.contains(target)) {
                setSelectedComp(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div ref={plateRef} className="plate-container mx-auto flex justify-center items-center relative aspect-[4/3] min-w-[210px] bg-zinc-900 rounded-xl px-1">
            {/* if comp is selected, border-2 border-zinc-300 */}
            <div
                className={`${selectedComp === 1 ? "selected-comp" : ""} absolute top-2 left-2 comp-1 h-[30%] w-[70%] bg-zinc-700 rounded-sm rounded-tl-xl flex items-center justify-center`}
                onClick={() => setSelectedComp(1)}
                role="button">
                <small className="text-gray-300 text-md">1</small>
            </div>
            <div
                className={`${selectedComp === 2 ? "selected-comp" : ""} absolute top-2 right-2 comp-2 h-[30%] w-[20%] bg-zinc-700 rounded-sm rounded-tr-xl flex items-center justify-center`}
                onClick={() => setSelectedComp(2)}
                role="button">
                <small className="text-gray-300 text-md">2</small>
            </div>
            <div
                className={`${selectedComp === 3 ? "selected-comp" : ""} absolute bottom-2 left-2 comp-3 h-[55%] w-[25%] bg-zinc-700 rounded-sm rounded-bl-xl flex items-center justify-center`}
                onClick={() => setSelectedComp(3)}
                role="button">
                <small className="text-gray-300 text-md">3</small>
            </div>
            <div
                className={`${selectedComp === 4 ? "selected-comp" : ""} absolute bottom-2 left-17 comp-4 h-[55%] w-[38%] bg-zinc-700 rounded-sm flex items-center justify-center`}
                onClick={() => setSelectedComp(4)}
                role="button">
                <small className="text-gray-300 text-md">4</small>
            </div>
            <div
                className={`${selectedComp === 5 ? "selected-comp" : ""} absolute bottom-2 right-2 comp-5 h-[55%] w-[25%] bg-zinc-700 rounded-sm rounded-br-xl flex items-center justify-center`}
                onClick={() => setSelectedComp(5)}
                role="button">
                <small className="text-gray-300 text-md">5</small>
            </div>
        </div>
    )
}
