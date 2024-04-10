'use server';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from "next/cache";
import mongoose, { FilterQuery, SortOrder } from "mongoose";

import User from '@/lib/models/User.model';

import { connect } from '@/config/mongoose';

// Define user params
interface Params {
    userId: string;
    username: string;
    email: string;
    fullname: string;
    bio: string;
    image: string;
    path: string;
}

// Method to get User
export async function fetchUser(email: string) {
    connect();

    try {
        // find user by email
        const user = await User.findOne({email})

        // return user
        return user;
    } catch (error: any) {
        console.log('Error fetching user: ', error);
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

// Method to Update User
export async function updateUser({ userId, bio, fullname, path, username, image }: Params): Promise<void> {
    try {
        connect();

        // Check if user exists
        const userById = await User.findOne({ _id: userId });
        if (!userById) {
            throw new Error("User not found");
        }

        // Check if username is already taken by another user, excluding the current user
        const userByUsername = await User.findOne({ username, _id: { $ne: userId } });
        if (userByUsername) {
            throw new Error("Username is already taken");
        }

        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                fullname,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true }
        );

        // Revalidate the path if it's the profile edit page
        if (path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
}