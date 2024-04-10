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