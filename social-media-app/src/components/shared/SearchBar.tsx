'use client';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";

// Import components
import { Input } from "@/components/ui/input";


const SearchBar = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const onSearchHandler = async () => {
        router.push(`/search?q=${search}`);
    }

    return (
        <>
            {/* SearchBar component */}
            <div className='searchbar'>
                <div onClick={onSearchHandler}>
                    <Image
                        src='/assets/search-gray.svg'
                        alt='search'
                        width={24}
                        height={24}
                        className='object-contain'
                    />
                </div>
                <Input
                    id='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search for a creator or a keyword of a post...'
                    className='no-focus searchbar_input'
                />
            </div>
        </>
    )
}

export default SearchBar