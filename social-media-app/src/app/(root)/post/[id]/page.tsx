import React from 'react';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options';

import { fetchUser } from '@/lib/actions/user.actions';
import { fetchPostById } from '@/lib/actions/post.action';

import PostCard from "@/components/cards/PostCard";
import CommentForm from '@/components/forms/CommentForm';

const page = async ({ params }: { params: { id: string } }) => {
    if (!params.id) return null;

    const session = await getServerSession(options)

    const user = await fetchUser(session?.user?.email || '');

    const post = await fetchPostById(params.id);

    console.log(post.author)

    return (
        <>
            <section className='relative'>
                <div>
                    {/* render single post */}
                    <PostCard
                        id={post._id}
                        parentId={post.parentId}
                        content={post.text}
                        author={post.author}
                        community={post.community}
                        createdAt={post.createdAt}
                        comments={post.children}
                        likes={post.likes}
                    />
                </div>

                {/* Display comment form */}
                {session && (
                    <div className='mt-7'>
                        <CommentForm
                            postId={params.id}
                            currentUserImg={user?.image}
                            currentUserId={JSON.stringify(user?._id)}
                        />
                    </div>
                )}

                {/* Display comments under parent post  */}
                <div className='mt-10'>
                    {post.children.map((childItem: any) => (
                        <PostCard
                            key={childItem._id}
                            id={childItem._id}
                            parentId={childItem.parentId}
                            content={childItem.text}
                            author={childItem.author}
                            community={childItem.community}
                            createdAt={childItem.createdAt}
                            comments={childItem.children}
                            likes={childItem.likes}
                            isComment
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default page;