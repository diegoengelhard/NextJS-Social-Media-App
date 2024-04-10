import React from 'react';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options';

import { fetchUser } from '@/lib/actions/user.actions';
import { fetchUserById } from '@/lib/actions/user.actions';
import { fetchPostsByAuthor } from '@/lib/actions/user.actions';

import ProfileHeader from "@/components/shared/ProfileHeader";
import PostCard from '@/components/cards/PostCard';

const page = async ({ params }: { params: { id: string } }) => {
    const session = await getServerSession(options)
 
    const authenticatedUser = await fetchUser(session?.user?.email || '');
    const userInfo = await fetchUserById(params.id);

    const posts = await fetchPostsByAuthor(userInfo._id);

    return (
        <section>
            {/* User header */}
            <ProfileHeader
                accountId={userInfo._id}
                authUserId={authenticatedUser._id}
                name={userInfo.fullname}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />

            <section className='mt-9 flex flex-col gap-10'>
                <h2 className='text-left text-heading3-bold text-light-1'>
                    Posts
                </h2>
                {/* Render all user posts */}
                {posts.map((post) => (
                    <PostCard
                        key={post._id}
                        id={post._id}
                        parentId={post.parentId}
                        content={post.text}
                        author={post.author}
                        community={post.community}
                        createdAt={post.createdAt}
                        comments={post.children}
                        likes={post.likes}
                    />
                ))}
            </section>
        </section>
    )
}

export default page