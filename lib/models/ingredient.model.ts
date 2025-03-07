import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    label: { type: String, required: true },
    category: { type: String, required: true },
    nutrition: { type: Object, required: true },
})

export const Ingredient = mongoose.models.Ingredient || mongoose.model("Ingredient", ingredientSchema);
