'use client';

import { upvotePost, downvotePost } from '@/lib/addLikes';
import { prisma } from '@/prisma/db';
import { useEffect, useState } from 'react';

import { GetVotes } from '@/lib/getVotes';

interface VoteProps {
  postId: number | undefined;
}

export function Vote({ postId }: VoteProps) {
  const [upvoteCount, setUpvoteCount] = useState(0);

  useEffect(() => {
    async function getVotes() {
      const votes = await GetVotes({ postId });
      if (votes?.like) {
        setUpvoteCount(votes?.like);
      }
    }
    getVotes();
  }, [upvoteCount]);

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="w-[5rem] text-orange-500 mb-2"
        onClick={() => upvotePost(postId)}
      >
        Ayos ah
      </button>
      <span>{upvoteCount}</span>

      <button
        className="w-[5rem] text-orange-500"
        onClick={() => downvotePost(postId)}
      >
        Boo!
      </button>
    </div>
  );
}
