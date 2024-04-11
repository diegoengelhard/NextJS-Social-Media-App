import React from 'react';
import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options';

import { fetchUser } from '@/lib/actions/user.actions';

import Links from '@/components/shared/Links';

const LeftSideBar = async () => {
    const session = await getServerSession(options)

    const user = await fetchUser(session?.user?.email || '');

    return (
        <Links user={user} />
    )
}

export default LeftSideBar