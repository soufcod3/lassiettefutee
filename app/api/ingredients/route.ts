import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/lib/mongoose";
import { Ingredient } from "@/lib/models/ingredient.model";
import { NextResponse } from "next/server";
import { IIngredient } from "@/lib/types/ingredient";

export async function GET() {
    try {
        await connectToDB();
        const ingredients: IIngredient[] = await Ingredient.find({ stock: { $gt: 0 } });
        return NextResponse.json(ingredients);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch ingredients" }, { status: 500 });
    }
}
