import { connect } from '@/config/mongoose';
import User from '@/lib/models/User.model';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        // Get user data from request body
        const { fullname, username, email, password } = await request.json();

        // Check if user already exists
        const user = await User.findOne({ email });

        // If user already exists, return error
        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullname,
            username,
            email,
            password: hashedPassword
        });

        // Save new user
        await newUser.save();

        // Log new user
        console.log('New user created:', newUser);

        // Return success message
        return NextResponse.json({ message: 'User created', user: newUser }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}