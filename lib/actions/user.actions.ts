"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { IUserData, IUserDb, User } from "../models/user.model";
import { connectToDB } from "../mongoose";
import { omit } from 'lodash';

export const updateClerkUser = async (userData: IUserData) => {

    if (!userData.id) {
        throw new Error("No Logged In User");
    }

    const client = await clerkClient();

    try {
        const res = await client.users.updateUser(userData.id, {
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
    await User.findOneAndUpdate(
      { id: userData.id },
      userData,
      { new: true, upsert: true }
    )

    return { message: true }; // cant return user with _id (plain object error)
  } catch (err) {
    return { error: 'There was an error updating the user : ' + err };

  }
}

export const getClerkUser = async () => {
  const { userId } = await auth(); // doesnt seem to work in production (null values)
  if (!userId) {
    throw new Error("No Logged In User");
  }
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user;
}

export const getUserDb = async (id: string) => {
  await connectToDB();

  const user = await User.findOne({ id }).lean();

  // dont return user with _id (plain object error)
  const userWithoutId = omit(user, ['_id', '__v']);
  return userWithoutId as IUserDb;
}