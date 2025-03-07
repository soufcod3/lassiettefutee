import { Ingredient } from "../models/ingredient.model";
import { connectToDB } from "../mongoose";

const getIngredientsFromDb = async () => {
    await connectToDB();
    
    const ingredients = await Ingredient.find({});
    return ingredients;
}

export default getIngredientsFromDb;