'use client';

import { upvotePost, downvotePost } from '@/lib/addLikes-actions';
import { useEffect, useState } from 'react';

import { GetLikes } from '@/lib/getLike-actions';
import { GetDislike } from '@/lib/getDislike-actions';

interface VoteProps {
  postId: number;
}

export function Vote({ postId }: VoteProps) {
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [prevCount, setPrevCount] = useState(0);

  useEffect(() => {
    async function getVotes() {
      const likes = await GetLikes({ postId });
      const dislikes = await GetDislike({ postId });

      const currentLikes =
        likes.length - dislikes.length || dislikes.length - likes.length;

      setPrevCount(currentLikes);

      // console.log(likes.length, 'like');
      // console.log(dislikes.length, 'dislike');

      if (currentLikes !== upvoteCount) {
        setUpvoteCount(currentLikes);
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
