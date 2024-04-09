'use server';
import { getSession } from 'next-auth/react';

// Gets user session
export async function currentSession() {
    return await getSession();
}