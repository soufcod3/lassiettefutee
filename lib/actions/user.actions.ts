"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { IUserData } from "../models/user.model";

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
        console.log('res in action', res);
        return { message: res.publicMetadata }
      } catch (err) {
        return { error: 'There was an error updating the user metadata : ' + err }
      }
}