'use client';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants";

import { useSession } from 'next-auth/react';

const LeftSideBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const session 
    return (
        <div>LeftSideBar</div>
    )
}

export default LeftSideBar