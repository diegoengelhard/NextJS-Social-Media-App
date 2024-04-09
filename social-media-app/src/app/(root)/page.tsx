import React from 'react'
import {options} from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from "next-auth/next"

export default async function Home() {
  const session = await getServerSession(options)
  console.log(session)

  return (
    <h1 className='text-white'>
      Welcome to the Social Media App!
    </h1>
  )
}
