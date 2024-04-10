import React from 'react';
import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect, useRouter } from "next/navigation";

import { fetchUser } from '@/lib/actions/user.actions';

import AccountProfile from '@/components/forms/AccountProfile';

const page = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/");
  }

  const user = await fetchUser(session?.user?.email || '');

  const userData = {
    id: user._id,
    fullname: user.fullname ? user.fullname : '',
    username: user.username ? user.username : '',
    bio: user.bio ? user.bio : '',
    image: user.image ? user.image : '',
  }

  return (
    <>
      <h1 className='head-text'>Edit Profile</h1>
      <p className='mt-3 text-base-regular text-light-2'>Make any changes</p>

      <section className='mt-12'>
        <AccountProfile user={userData} btnTitle='Update' />
        <div>edit page</div>
      </section>
    </>
  )
}

export default page