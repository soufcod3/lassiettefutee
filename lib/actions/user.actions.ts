"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { IUserData, User } from "../models/user.model";
import { connectToDB } from "../mongoose";

export const updateClerkUser = async (userData: IUserData) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("No Logged In User");
    }

    const client = await clerkClient();

    try {
        const res = await client.users.updateUser(userId, {
            lastName: userData.lastname,
            firstName: userData.firstname,
        })
        return { message: res.publicMetadata }
      } catch (err) {
        return { error: 'There was an error updating the user metadata : ' + err }
      }
}

export const updateUserDb = async (userData: IUserData) => {
  await connectToDB();

  try {
    const user = await User.findOneAndUpdate(
      { id: userData.id }, // Ensure you are searching by a unique identifier
      userData,
      { new: true, upsert: true } // `upsert: true` creates the user if it doesn't exist
    )

    return { message: true }; // cant return user with _id (plain object error)
  } catch (err) {
    return { error: 'There was an error updating the user : ' + err };
  }
}