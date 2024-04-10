import React from 'react';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options';

import { fetchUser } from '@/lib/actions/user.actions';
import { fetchPostById } from '@/lib/actions/post.action';

import PostForm from '@/components/forms/PostForm';

const page = async ({ params }: { params: { id: string } }) => {
    // Check if params exist
    if (!params.id) redirect('/');

    // Get next-auth session
    const session = await getServerSession(options)

    if (!session) redirect('/');

    // Fetch user data
    const user = await fetchUser(session?.user?.email || '');

    // Fetch post data
    const post = await fetchPostById(params.id); // fetch post by id from db
    if (!post) return null;

    // Define post data
    const postData = {
        id: post._id,
        text: post.text,
    }

    return (
        <>
            <h1 className='head-text'>Edit Post</h1>
            <PostForm userId={user._id} postData={postData} edit={true} />
        </>
    )
}

export default page