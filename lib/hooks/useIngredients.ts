import { useState, useEffect } from "react";
// import { Ingredient } from "../models/ingredient.model";

interface Ingredient {
    _id: string;
    name: string;
    price: number;
    stock: number;
    label: string;
    category: string;
    nutrition: {
        calories: number;
        proteins: number;
        carbs: number;
        fats: number;
    };
}

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchIngredients = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/ingredients");
            if (!response.ok) throw new Error("Failed to fetch ingredients");
            const data: Ingredient[] = await response.json();
            setIngredients(data);
        } catch (err) {
            console.log(err);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchIngredients();
    }, []);

    return { ingredients, loading, error, refetch: fetchIngredients };
};
