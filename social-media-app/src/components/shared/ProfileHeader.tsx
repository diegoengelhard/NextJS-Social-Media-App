import React from 'react';
import Link from "next/link";
import Image from "next/image";

// Define props
interface Props {
    accountId: string;
    authUserId?: string;
    name: string;
    username: string;
    imgUrl: string;
    bio: string;
    type?: string;
}

const ProfileHeader = ({
    accountId,
    authUserId,
    name,
    username,
    imgUrl,
    bio,
    type,
}: Props) => {

    return (
        <div className='flex w-full flex-col justify-start'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='relative h-20 w-20 object-cover'>
                        {/* User image */}
                        <Image
                            src={imgUrl}
                            alt='logo'
                            fill
                            className='rounded-full object-cover shadow-2xl'
                        />
                    </div>

                    <div className='flex-1'>
                        {/* User fullname */}
                        <h2 className='text-left text-heading3-bold text-light-1'>
                            {name}
                        </h2>

                        {/* User username */}
                        <p className='text-base-medium text-gray-1'>@{username}</p>
                    </div>
                </div>

                {/* If user id from params = user id who's signed in, show edit */}
                {JSON.stringify(accountId) === JSON.stringify(authUserId) && type !== "Community" && (
                    <Link href={`/profile/${accountId}/edit`}>
                        <div className='flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2'>
                            <Image
                                src='/assets/edit.svg'
                                alt='logout'
                                width={16}
                                height={16}
                            />

                            <p className='text-light-2 max-sm:hidden'>Edit</p>
                        </div>
                    </Link>
                )}
            </div>

            {/* User bio */}
            <p className='mt-6 max-w-lg text-base-regular text-light-2'>{bio}</p>

            <div className='mt-12 h-0.5 w-full bg-dark-3' />
        </div>
    )
}

export default ProfileHeader