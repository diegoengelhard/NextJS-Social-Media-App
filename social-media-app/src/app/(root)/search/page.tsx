import React from 'react';
import { searchPosts } from '@/lib/actions/post.action';
import { searchUsers } from '@/lib/actions/user.actions';

import SearchBar from "@/components/shared/SearchBar";
import PostCard from '@/components/cards/PostCard';
import UserCard from '@/components/cards/UserCard';

interface ResponseData {
    type: string;
    data: any;
}

const page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined }; }) => {
    // Set a default value of an empty string if searchParams.q is undefined
    const search = searchParams.q || "";
    let results: ResponseData[]; // Define results as an array of ResponseData

    // Fetch search results
    const userResults = await searchUsers(search);
    const postResults = await searchPosts(search);

    // Set results to an array of objects
    results = [
        { type: 'user', data: userResults },
        { type: 'post', data: postResults }
    ];

    // Render users result
    const renderUsers = (
        <div>
            <h3 className='text-xl my-4 font-bold text-white'>Users</h3>
            {results.map((result, index) => (
                <div key={index}>
                    <ul>
                        {result.data.map((item: any, idx: number) => (
                            <li key={idx}>
                                {result.type === 'user' &&
                                    <UserCard
                                        id={item.id}
                                        fullname={item.fullname}
                                        username={item.username}
                                        image={item.image}
                                    />
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

    // Render posts result
    const renderPosts = (
        <div>
            <h3 className='text-xl my-4 font-bold text-white'>Posts</h3>
            {results.map((result, index) => (
                <div key={index}>
                    <ul>
                        {result.data.map((item: any, idx: number) => (
                            <li key={idx}>
                                {result.type === 'post' &&
                                    <PostCard
                                        id={item._id}
                                        parentId={item.parentId}
                                        content={item.text}
                                        author={item.author}
                                        community={item.community}
                                        createdAt={item.createdAt}
                                        comments={item.comments}
                                        isComment={item.isComment}
                                        likes={item.likes}
                                    />
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

    return (
        <section>
            <h1 className='head-text mb-10'>Search</h1>
    
            <SearchBar />
    
            {search === "" ? (
                <h2 className='head-text my-10'>Oops, looks like nothing was found here!</h2>
            ) : results[0].data.length === 0 && results[1].data.length === 0 ? (
                <h2 className='head-text my-10'>Oops, looks like nothing was found!</h2>
            ) : (
                <>
                    <h2 className='head-text my-10'>Results for: "{search}"</h2>
                    <div className='space-y-10'>
                        {renderUsers}
                        {renderPosts}
                    </div>
                </>
            )}
    
        </section>
    )
}

export default page