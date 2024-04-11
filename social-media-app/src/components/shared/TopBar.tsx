'use client';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from 'next-auth/react';
import {toast} from 'react-toastify';

const TopBar = () => {
    const router = useRouter();

    const { data: session, status } = useSession();

    const handleSignOut = () => {
        toast.success('Successfully signed out!');
        setTimeout(() => {
            signOut();
        }, 2000);
    }

    return (
        <nav className='topbar'>
            <Link href='/' className='flex items-center gap-4'>
                <Image src='/assets/logo.svg' alt='logo' width={28} height={28} />
                <p className='text-heading3-bold text-light-1 max-xs:hidden'>Social Media App</p>
            </Link>

            <div className='flex items-center gap-1'>
                <div className='block md:hidden'>
                    {!session ? (
                        <div 
                            className='flex cursor-pointer gap-3'
                            onClick={() => router.push('/sign-in')} 
                        >
                        <Image
                            src='/assets/logout.svg'
                            alt='signin'
                            width={24}
                            height={24}
                        />
                        <p className='text-light-2'>Sign In</p>
                    </div>
                    ) : (
                        <div 
                            className='flex cursor-pointer gap-3'
                            onClick={() => handleSignOut()}
                        >
                            <Image
                                src='/assets/logout.svg'
                                alt='logout'
                                width={24}
                                height={24}
                            />
                            <p className='text-light-2'>Logout</p>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default TopBar