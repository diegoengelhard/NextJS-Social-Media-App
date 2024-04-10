'use client';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from 'next-auth/react';
import { sidebarLinks } from "@/constants";
import { toast } from 'react-toastify';

const LeftSideBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { data: session, status } = useSession();
    console.log("Session: ", session);

    const handleSignOut = () => {
        toast.success('Successfully signed out!');
        setTimeout(() => {
            signOut();
        }, 2000);
    }

    return (
        <section className='custom-scrollbar leftsidebar'>
            <div className='flex w-full flex-1 flex-col gap-6 px-6'>
                {sidebarLinks.map((link) => {
                    const isActive =
                        (pathname.includes(link.route) && link.route.length > 1) ||
                        pathname === link.route;

                    if (link.route === "/profile") link.route = `${link.route}/${123}`;

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                            />

                            <p className='text-light-1 max-lg:hidden'>{link.label}</p>
                        </Link>
                    );
                })}
            </div>

            <div className='mt-10 px-6'>
                {session ? (
                    <div 
                        className='flex cursor-pointer gap-4 p-4'
                        onClick={() => handleSignOut()}    
                    >
                        <Image
                            src='/assets/logout.svg'
                            alt='logout'
                            width={24}
                            height={24}
                        />

                        <p className='text-light-2 max-lg:hidden'>Logout</p>
                    </div>
                ) : (
                    <div 
                        className='flex cursor-pointer gap-4 p-4'
                        onClick={() => router.push("/sign-in")}
                    >
                        <Image
                            src='/assets/signin.svg'
                            alt='signin'
                            width={24}
                            height={24}
                        />

                        <p className='text-light-2 max-lg:hidden'>Sign In</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default LeftSideBar