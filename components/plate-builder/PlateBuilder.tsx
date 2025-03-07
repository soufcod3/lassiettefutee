"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";

import Image from "next/image";
import { TiRefresh } from "react-icons/ti";
import { TiArrowBack } from "react-icons/ti";
import getIngredientsFromDb from "@/lib/actions/ingredient.actions";
import { useIngredients } from "@/lib/hooks/useIngredients";

const emptyPlate = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null
}

const categories = [
    "Nos Viandes",
    "Nos Pâtes",
    "Nos Légumes"
];

const categoryMapping = {
    "meat": "Nos Viandes",
    "carbs": "Nos Pâtes",
    "vegetables": "Nos Légumes"
};

const PlateBuilder = () => {
    const plateRef = useRef<HTMLDivElement | null>(null);
    const { ingredients, loading, error, refetch } = useIngredients();


    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

    const [plate, setPlate] = useState<{ [key: number]: string | null }>(emptyPlate);

    const [selectedCategory, setSelectedCategory] = useState<string>("Nos Viandes");

    // TODO : get available ingredients from the database (stock > 0)

    // Unselect ingredient and slot when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".ingredient") && !target.closest(".comp") && !target.closest(".category")) {
                setSelectedIngredient(null);
                setSelectedSlot(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleSlotSelection = (slot: number) => {
        if (selectedIngredient) {
            addIngredientToSlot(selectedIngredient, slot);
        } else {
            setSelectedSlot(slot);
        }
    }

    const handleIngredientSelection = (ingredient: string) => {
        // TODO : verify if ingredient has enough stock (IN A NEW FUNCTION)
        // await refetchIngredients()
        // const hasEnoughStock = ingredients.find((i) => i.name === ingredient)?.stock > 0;
        // if (!hasEnoughStock) {
        //     console.error("Produit épuisé"); TOAST
        //     return;
        // }

        if (selectedSlot) {
            addIngredientToSlot(ingredient, selectedSlot);
        } else {
            setSelectedIngredient(ingredient);
        }
    }

    const addIngredientToSlot = (ingredient: string, slot: number) => {
        if (canAddIngredient(ingredient)) {
            setPlate({ ...plate, [slot]: ingredient });
            setSelectedIngredient(null);
            setSelectedSlot(null);

            // TODO : update ingredient stock
        } else {
            console.error("Essaye de varier les ingrédients");
        }
    }

    const canAddIngredient = (ingredient: string) => {
        // TODO : verify ingredient stock 
        // then count how many times it's in the plate
        const ingredientCount = Object.values(plate).filter((item) => item === ingredient).length;
        return ingredientCount < 2;
    }

    return (
        <div className="flex flex-col items-center">
            {/* Categories */}
            <div className="category flex gap-3 justify-center my-3">
                {categories.map((category, index) => (
                    <small key={index} className={`flex ${selectedCategory === category ? "font-semibold" : ""}`} onClick={() => setSelectedCategory(category)} role="button">{category}</small>
                ))}
            </div>
            {/* Ingredients */}
            <div className="flex justify-center w-full">
                <div className="flex gap-3 overflow-x-auto px-5 pb-3">
                    {loading ? (
                        <p className="text-center text-xs my-2">Récolte des ingrédients...</p>
                    ) : !ingredients ? (
                        <p className="text-center text-xs my-2">Aucun ingrédient disponible</p>
                    ) : (
                        ingredients.filter((ingredient) => categoryMapping[ingredient.category as keyof typeof categoryMapping] === selectedCategory).map((ingredient, index) => (
                        <div key={index} className="ingredient flex flex-col items-center justify-center" onClick={() => handleIngredientSelection(ingredient.label)} role="button">
                            <Card className={`rounded-md aspect-square flex items-center justify-center w-20 h-20 bg-white border-gray-200 shadow-sm ${selectedIngredient === ingredient.label ? "selected-ingredient" : ""}`}>
                                <Image src={`/assets/ingredients/${ingredient.name}.png`} alt={ingredient.label} width={70} height={70} />
                            </Card>
                            <p className="text-center text-xs my-1">{ingredient.label}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {/* Plate and buttons */}
            <div className="flex justify-center items-center gap-2">
                {/* Reset button */}
                <div className="flex flex-col items-center justify-center" role="button" onClick={() => console.log("Annuler")}>
                    <TiRefresh className="w-6 h-6" />
                    <p className="text-xs font-semibold">Annuler</p>
                </div>

                {/* Plate */}
                <div ref={plateRef} className="plate-container mx-auto flex justify-center items-center relative aspect-[4/3] min-w-[210px] bg-zinc-900 rounded-xl px-1">
                    {/* if comp is selected, border-2 border-zinc-300 */}
                    <div
                        className={`${!selectedIngredient && selectedSlot === 1 ? "selected-comp" : ""} comp absolute top-2 left-2 comp-1 h-[30%] w-[70%] bg-zinc-700 rounded-sm rounded-tl-xl flex items-center justify-center`}
                        onClick={() => handleSlotSelection(1)}
                        role="button">
                        <small className="text-gray-300 text-md">{plate[1] || "1"}</small>
                    </div>
                    <div
                        className={`${!selectedIngredient && selectedSlot === 2 ? "selected-comp" : ""} comp absolute top-2 right-2 comp-2 h-[30%] w-[20%] bg-zinc-700 rounded-sm rounded-tr-xl flex items-center justify-center`}
                        onClick={() => handleSlotSelection(2)}
                        role="button">
                        <small className="text-gray-300 text-md">{plate[2] || "2"}</small>
                    </div>
                    <div
                        className={`${!selectedIngredient && selectedSlot === 3 ? "selected-comp" : ""} comp absolute bottom-2 left-2 comp-3 h-[55%] w-[25%] bg-zinc-700 rounded-sm rounded-bl-xl flex items-center justify-center`}
                        onClick={() => handleSlotSelection(3)}
                        role="button">
                        <small className="text-gray-300 text-md">{plate[3] || "3"}</small>
                    </div>
                    <div
                        className={`${!selectedIngredient && selectedSlot === 4 ? "selected-comp" : ""} comp absolute bottom-2 left-17 comp-4 h-[55%] w-[38%] bg-zinc-700 rounded-sm flex items-center justify-center`}
                        onClick={() => handleSlotSelection(4)}
                        role="button">
                        <small className="text-gray-300 text-md">{plate[4] || "4"}</small>
                    </div>
                    <div
                        className={`${!selectedIngredient && selectedSlot === 5 ? "selected-comp" : ""} comp absolute bottom-2 right-2 comp-5 h-[55%] w-[25%] bg-zinc-700 rounded-sm rounded-br-xl flex items-center justify-center`}
                        onClick={() => handleSlotSelection(5)}
                        role="button">
                        <small className="text-gray-300 text-md">{plate[5] || "5"}</small>
                    </div>
                </div>

                {/* Back button */}
                <div className="flex flex-col items-center justify-center" role="button" onClick={() => console.log("Retour")}>
                    <TiArrowBack className="w-6 h-6" />
                    <p className="text-xs font-semibold">Retour</p>
                </div>
            </div>
        </div>
    );
};


export default PlateBuilder;
