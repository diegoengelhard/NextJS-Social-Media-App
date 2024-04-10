import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { redirect } from 'next/navigation';

import { fetchUser } from "@/lib/actions/user.actions";


// Define post card props
interface Props {
    id: string;
    parentId: string | null;
    content: string;
    author: {
        username: string;
        image: string;
        id: string;
    };
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        };
    }[];
    likes: string[];
    isComment?: boolean;
}

const PostCard = ({
    id,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    likes,
    isComment,
}: Props) => {
    return (
        <div>PostCard</div>
    )
}

export default PostCard