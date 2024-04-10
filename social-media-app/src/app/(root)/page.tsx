import React from 'react'
import { getServerSession } from "next-auth/next"
import { options } from '@/app/api/auth/[...nextauth]/options';

import { fetchUser } from '@/lib/actions/user.actions';
import { fetchPosts } from '@/lib/actions/post.action';

import PostCard from '@/components/cards/PostCard';

export default async function Home() {
  const session = await getServerSession(options)
  console.log(session)

  const user = await fetchUser(session?.user?.email || '');
  console.log(user);

  const posts = await fetchPosts();

  return (
    <main className="text-white">
      <h1 className="text-4xl font-bold text-white">Welcome to the social media app</h1>

      {/* Render fetched posts */}
      <section className='mt-9 flex flex-col gap-10'>
        {posts.posts.length === 0 ? (
          <p className='no-result'>No posts found</p>
        ) : (
          <>
            {posts.posts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                likes={post.likes}
              />
            ))}

            {posts.posts.length < 0 && (
              <p>No posts</p>
            )}
          </>
        )}
      </section>
    </main>
  )
}
