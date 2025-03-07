export interface IIngredient {
    name: string;
    label: string;
    category: string;
    price: number;
    stock: number;
    nutrition: INutrition;
}

export interface INutrition {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
}