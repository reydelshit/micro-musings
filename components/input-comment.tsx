'use client';

import { CommentProfile } from './comment-profile';

import { useEffect, useState } from 'react';

import { GetCommentsForPost } from '@/lib/fetchComments';
import { User } from '@prisma/client';
import { prisma } from '@/prisma/db';

import { addComment } from '@/lib/comment-actions';

interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: User | null;
  authorId: string | null;
  postId: number;
}

export function InputComment({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function getComments() {
      const comments = await GetCommentsForPost({ postId });
      if (comments) {
        setComments(comments);
      }
    }

    getComments();
  }, [comments]);

  async function handleSubmit(formData: FormData) {
    await addComment(formData, postId);

    const input = document.querySelector(
      'input[name="content"]',
    ) as HTMLInputElement;
    input.value = '';
  }

  const formatDate = (date: Date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const day = dateObj.toLocaleString('default', { day: 'numeric' });
    const year = dateObj.toLocaleString('default', { year: 'numeric' });
    return `${month} ${day}, ${year}`;
  };

  return (
    <div className="h-full lg:h-[50%] w-full lg:w-[40%] border-2 mt-5 p-5 bg-white rounded-md">
      <div className="flex flex-col">
        <div className="h-full ">
          {comments
            .filter((co) => co.postId === parseInt(postId))
            .map((co) => {
              return (
                <div
                  className="flex w-full items-start mb-2 flex-col justify-center "
                  key={co.id}
                >
                  <div className="flex w-full h-full ">
                    <img
                      className="rounded-full w-[3rem] h-[3rem] mr-2"
                      src={co.author?.image!}
                      alt={co.author?.name}
                    />

                    <div className="text-base/6 h-full w-[90%]">
                      <h1 className="font-bold">{co.author?.name}</h1>

                      <p className="pl-2 text-sm text-left break-words text-black">
                        {co.content}
                      </p>
                      <p className="text-gray-500 self-start text-xs">
                        {formatDate(co.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <form className="flex flex-col" action={handleSubmit}>
          <div className="flex justify-between items-center">
            <CommentProfile />
            <input
              placeholder="your hinanaings here"
              name="content"
              type="text"
              className="border-2 w-[85%] h-[7rem] mt-2 outline-none px-2"
            />
          </div>

          <input
            type="submit"
            className="cursor-pointer self-end mt-2 bg-slate-900 hover:bg-orange-300 hover:text-black text-white font-bold py-2 px-4 rounded-full"
          />
        </form>
      </div>
    </div>
  );
}
