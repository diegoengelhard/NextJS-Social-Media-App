import React from 'react';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options';

import { fetchUser } from '@/lib/actions/user.actions';

import PostForm from '@/components/forms/PostForm';

const page = async () => {
    // Get next-auth session
    const session = await getServerSession(options)
    console.log(session)

    // Redirect if no session
    if (!session) redirect('/');

    // Fetch user data
    const user = await fetchUser(session?.user?.email || '');
    console.log(user);

    return (
        <>
            <h1 className='head-text'>Create Post</h1>
            <PostForm userId={user._id} />
        </>
    )
}

export default page