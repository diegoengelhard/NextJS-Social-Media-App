import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/lib/models/User.model";
import { connect } from "@/config/mongoose";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials, req) {
                const { email, password } = credentials as { email: string; password: string };

                try {
                    await connect();
                    const user = await User.findOne({ email });

                    if (!user) {
                        throw new Error("User not found");
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) {
                        throw new Error("Password does not match");
                    }

                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
}