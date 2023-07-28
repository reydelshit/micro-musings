'use client';

import { upvotePost, downvotePost } from '@/lib/addLikes';
import { useEffect, useState } from 'react';

import { GetVotes } from '@/lib/getVotes';

interface VoteProps {
  postId: number;
}

export function Vote({ postId }: VoteProps) {
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [prevCount, setPrevCount] = useState(0);

  useEffect(() => {
    async function getVotes() {
      const votes = await GetVotes({ postId });
      setPrevCount(votes?.like as number);

      if (votes?.like !== upvoteCount) {
        setUpvoteCount(votes?.like as number);
      }
    }

    getVotes();
  }, [postId, upvoteCount]);

  const handleUpvote = (id: number) => {
    upvotePost(id);
    setUpvoteCount(prevCount + 1);
  };

  const handleDownVotePost = (id: number) => {
    downvotePost(id);
    setUpvoteCount(prevCount - 1);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="w-[5rem] text-orange-500 mb-2"
        onClick={() => handleUpvote(postId)}
      >
        Ayos ah
      </button>
      <span>{upvoteCount}</span>

      <button
        className="w-[5rem] text-orange-500"
        onClick={() => handleDownVotePost(postId)}
      >
        Boo!
      </button>
    </div>
  );
}
