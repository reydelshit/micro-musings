'use client';

import { upvotePost, downvotePost } from '@/lib/add-likes';
import { useEffect, useState } from 'react';

import { GetLikes } from '@/lib/get-likes';
import { GetDislike } from '@/lib/get-dislike';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

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
        <FontAwesomeIcon
          className="fa-likes text-2xl md:text-4xl"
          style={{ color: '#3f2305' }}
          icon={faThumbsUp}
        />
      </button>
      <span className="font-bold">{upvoteCount}</span>

      <button
        className="w-[5rem] text-orange-500"
        onClick={() => handleDownVotePost(postId)}
      >
        <FontAwesomeIcon
          className="fa-likes text-2xl md:text-4xl"
          style={{ color: '#3f2305' }}
          icon={faThumbsDown}
        />
      </button>
    </div>
  );
}
