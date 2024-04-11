import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options';

import { fetchUser, getActivity } from "@/lib/actions/user.actions";

const page = async () => {
    const session = await getServerSession(options)

    if (!session) redirect('/');

    const user = await fetchUser(session?.user?.email || '');

    const { replies, likes } = await getActivity(user._id); // Fetch the user activity from db

    return (
        <>
            <h1 className='head-text'>Activity</h1>

            <section className='mt-10 flex flex-col gap-5'>
                <h2 className='text-white'>Replies</h2>
                {replies.length > 0 ? (
                    <>
                        {replies.map((reply) => (
                            <Link key={reply._id} href={`/thread/${reply.parentId}`}>
                                <article className='activity-card'>
                                    <Image
                                        src={reply.author.image}
                                        alt='user_logo'
                                        width={20}
                                        height={20}
                                        className='rounded-full object-cover'
                                    />
                                    <p className='!text-small-regular text-light-1'>
                                        <span className='mr-1 text-primary-500'>
                                            {reply.author.name}
                                        </span>{" "}
                                        replied to your <Link href={`/post/${reply.parentId}`} className='text-primary-500'>post</Link>
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </>
                ) : (
                    <p className='!text-base-regular text-light-3'>No replies yet</p>
                )}

                <h2 className='text-white'>Likes</h2>
                {likes.length > 0 ? (
                    <>
                        {likes.map((like) => (
                            <article className='activity-card'>
                                <Image
                                    src={like.image}
                                    alt='user_logo'
                                    width={20}
                                    height={20}
                                    className='rounded-full object-cover'
                                />
                                <p className='!text-small-regular text-light-1'>
                                    <span className='mr-1 text-primary-500'>
                                        {like.name}
                                    </span>{" "}
                                    liked your <Link href={`/post/${like._id}`} className='text-primary-500'>post</Link>
                                </p>
                            </article>
                        ))}
                    </>
                ) : (
                    <p className='!text-base-regular text-light-3'>No likes yet</p>
                )}
            </section>
        </>
    )
}

export default page