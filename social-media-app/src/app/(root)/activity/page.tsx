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

    const activity = await getActivity(user._id); // Fetch the user activity from db

    return (
        <>
            <h1 className='head-text'>Activity</h1>

            <section className='mt-10 flex flex-col gap-5'>
                {activity.length > 0 ? (
                    <>
                        {activity.map((activity) => (
                            <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                                <article className='activity-card'>
                                    <Image
                                        src={activity.author.image}
                                        alt='user_logo'
                                        width={20}
                                        height={20}
                                        className='rounded-full object-cover'
                                    />
                                    <p className='!text-small-regular text-light-1'>
                                        <span className='mr-1 text-primary-500'>
                                            {activity.author.name}
                                        </span>{" "}
                                        replied to your post
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </>
                ) : (
                    <p className='!text-base-regular text-light-3'>No activity yet</p>
                )}
            </section>
        </>
    )
}

export default page