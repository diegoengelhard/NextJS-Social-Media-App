"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { redirect, useRouter } from "next/navigation";

import { toast } from 'react-toastify';


const page = () => {
    const router = useRouter();

    const [fullname, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await axios.post("/api/auth/sign-up", {
                fullname,
                username,
                email,
                password,
            });

            toast.success("Sign Up Successful!");
            router.push('/sign-in');
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
          <div className="bg-dark-2 shadow-md p-8 border-t-4 border-primary-500 rounded-md w-3/4">
            <h1 className="text-2xl font-bold mb-4 text-white">Sign In</h1>
      
            <div className="rounded p-6 space-y-4">
              <input
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="Fullname"
                className="w-full p-2 rounded border border-gray-300"
              />
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                className="w-full p-2 rounded border border-gray-300"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded border border-gray-300"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="**********"
                className="w-full p-2 rounded border border-gray-300"
              />
              <button onClick={handleSubmit} className="bg-gray-800 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
            </div>
      
            <a href="/sign-in" className="text-sm text-white block mt-4">Already have an account? Sign In</a>
          </div>
        </div>
      );
      
}

export default page