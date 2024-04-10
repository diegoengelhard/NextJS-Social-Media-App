import React from 'react';
import Image from "next/image";
import Link from "next/link";

import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options';

const TopBar = async () => {
    const session = await getServerSession(options);

    const handleSignIn = async () => {};

    const handleLogout = async () => {};

    return (
        <nav className='topbar'>
            <Link href='/' className='flex items-center gap-4'>
                <Image src='/logo.svg' alt='logo' width={28} height={28} />
                <p className='text-heading3-bold text-light-1 max-xs:hidden'>Threads</p>
            </Link>

            <div className='flex items-center gap-1'>
                <div className='block md:hidden'>
                    {!session ? (
                        <div className='flex cursor-pointer'>
                        <Image
                            src='/assets/logout.svg'
                            alt='signin'
                            width={24}
                            height={24}
                            onClick={handleSignIn}
                        />
                    </div>
                    ) : (
                        <div className='flex cursor-pointer'>
                            <Image
                                src='/assets/logout.svg'
                                alt='logout'
                                width={24}
                                height={24}
                                onClick={handleLogout}
                            />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default TopBar