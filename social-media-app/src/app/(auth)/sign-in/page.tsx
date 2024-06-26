"use client";
import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import { toast } from 'react-toastify';

const page = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                toast.error('Invalid credentials. Please try again.');
                return;
            } else {
                toast.success("Sign In Successful!");
                router.push('/');
            }
        } catch (error: any) {
            console.log(error);
            toast.error('Error signing in.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-dark-2 shadow-md p-8 border-t-4 border-primary-500 rounded-md w-3/4">
                <h1 className="text-2xl font-bold mb-4 text-white">Sign In</h1>

                <div className="rounded p-6 space-y-4">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 rounded border border-gray-300"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 rounded border border-gray-300"
                    />
                    <button onClick={handleSubmit} className="bg-gray-800 text-white font-bold py-2 px-4 rounded">
                        Sign In
                    </button>
                </div>

                <a href="/sign-up" className="text-sm text-white block mt-4">Don't have an account? Sign Up</a>
            </div>
        </div>

    )
}

export default page