import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options';

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchUserById } from "@/lib/actions/user.actions";
import { formatDateString } from '@/lib/utils';

import LikePost from '@/components/forms/LikePost';
import DeletePost from '@/components/forms/DeletePost';

// Define post card props
interface Props {
    id: string;
    parentId: string | null;
    content: string;
    author: {
        username: string;
        image: string;
        _id: string;
    };
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        };
    }[];
    likes: string[];
    isComment?: boolean;
}

const PostCard = async ({
    id,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    likes,
    isComment,
}: Props) => {
    const session = await getServerSession(options)

    const user = await fetchUser(session?.user?.email || '');

    const postUser = await fetchUserById(author._id);

    console.log(postUser)   

    return (
        <article
            className={`flex w-full flex-col rounded-xl ${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"}`}
        >
            <div className='flex items-start justify-between'>
                <div className='flex w-full flex-1 flex-row gap-4'>
                    <div className='flex flex-col items-center'>
                        {/* Display post's user profile pic */}
                        <Link href={`/profile/${author._id}`} className='relative h-11 w-11'>
                            <Image
                                src={author.image}
                                alt='user_community_image'
                                fill
                                className='cursor-pointer rounded-full'
                            />
                        </Link>

                        <div className='thread-card_bar' />
                    </div>

                    {/* Display post's user profile name */}
                    <div className='flex w-full flex-col'>
                        <Link href={`/profile/${author._id}`} className='w-fit'>
                            <h4 className='cursor-pointer text-base-semibold text-light-1'>
                                @{postUser.username}
                            </h4>
                        </Link>

                        {/* Display post's content text */}
                        <p className='mt-2 text-small-regular text-light-2'>{content}</p>

                        <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
                            <div className='flex gap-3.5'>
                                <LikePost
                                    postId={id}
                                    userId={user?._id}
                                    likes={likes}
                                />
                                <Link href={`/post/${id}`}>
                                    <Image
                                        src='/assets/reply.svg'
                                        alt='heart'
                                        width={24}
                                        height={24}
                                        className='cursor-pointer object-contain'
                                    />
                                </Link>
                                {session && user?.username === author.username && (
                                    <>
                                        <Link href={`/edit-post/${id}`}>
                                            <Image
                                                src='/assets/edit.svg'
                                                alt='heart'
                                                width={20}
                                                height={20}
                                                className='cursor-pointer object-contain'
                                            />
                                        </Link>
                                        <DeletePost
                                            postId={id}
                                            parentId={parentId}
                                            isComment={isComment}
                                        />
                                    </>
                                )}
                            </div>

                            {isComment && comments && comments?.length > 0 && (
                                <Link href={`/post/${id}`}>
                                    <p className='mt-1 text-subtle-medium text-gray-1'>
                                        {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dipslay post's commennts */}
            {!isComment && comments && comments.length > 0 && (
                <div className='ml-1 mt-3 flex items-center gap-2'>
                    {comments.slice(0, 2).map((comment, index) => (
                        <Image
                            key={index}
                            src={comment.author.image}
                            alt={`user_${index}`}
                            width={24}
                            height={24}
                            className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
                        />
                    ))}

                    <Link href={`/post/${id}`}>
                        <p className='mt-1 text-subtle-medium text-gray-1'>
                            {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                        </p>
                    </Link>
                </div>
            )}
        </article>
    )
}

export default PostCard