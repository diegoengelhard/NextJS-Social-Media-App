import React from 'react'
import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options';

import { fetchUser } from '@/lib/actions/user.actions';

export default async function Home() {
  const session = await getServerSession(options)
  console.log(session)

  const user = await fetchUser(session?.user?.email || '');
  console.log(user);

  return (
    <h1 className='text-white'>
      Welcome to the Social Media App!
    </h1>
  )
}
