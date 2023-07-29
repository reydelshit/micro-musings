'use client';

import { prisma } from '@/prisma/db';
import { Vote } from '@/components/Vote';
import { CommentContainer } from '@/components/CommentContainer';
import { useEffect, useState } from 'react';

import { User } from '@prisma/client';

import { GetPostUser } from '@/lib/get-post-users';

interface Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  title: string;
  content?: string | null;
  category?: string | null;
  like: number;
  author?: User | null;
  authorId?: string | null;
}

export default function VisitUserPost({
  params,
}: {
  params: { userId: string };
}) {
  const [postByUser, setPostByUser] = useState<Post[]>([]);

  useEffect(() => {
    async function getPosts() {
      const posts = await GetPostUser({ profileId: params.userId });
      if (posts) {
        setPostByUser(posts);
      }
      console.log(posts);
    }

    getPosts();
  }, [params.userId]);

  const formatDate = (date: Date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const day = dateObj.toLocaleString('default', { day: 'numeric' });
    const year = dateObj.toLocaleString('default', { year: 'numeric' });
    return `${month} ${day}, ${year}`;
  };

  return (
    <main className="w-full min-h-[90vh] flex justify-center items-center p-2 flex-col">
      {postByUser.length > 0 && (
        <div
          className="flex items-start justify-center flex-col w-full lg:w-[40%] h-[10rem]"
          key={postByUser[0].authorId}
        >
          <div className="flex items-center">
            <img
              className="mr-2 rounded-md"
              src={postByUser[0].author?.image!}
              alt="emahe"
            />

            <div>
              <h1 className="font-bold text-4xl">
                {postByUser[0].author?.name}
              </h1>
              <span>{postByUser[0].author?.email}</span>

              <p>
                Account Joined:
                {formatDate(postByUser[0].author?.createdAt!)}
              </p>
            </div>
          </div>
        </div>
      )}
      {postByUser.map((post) => (
        <div
          key={post.id}
          className="h-full lg:h-[50%] w-full lg:w-[40%] border-2 mt-5 p-5 bg-white rounded-md"
        >
          <div className="flex justify-between mb-2">
            <div className="flex flex-col items-start md:flex-row h-[5rem] md:items-center">
              <span className="text-amber-700 text-sm">
                {post?.createdAt && formatDate(post?.createdAt)}
              </span>
              <p className="md:ml-2 font-bold">{post?.category}</p>
            </div>

            <div className="flex items-center">
              <img
                className="w-[3rem] md:w-[5rem] rounded-full mr-2"
                src={post.author?.image!}
                alt={post.author?.image!}
              />
              <span className="font-bold">{post.author?.name!}</span>
            </div>
          </div>
          <h1 className="font-bold text-2xl md:text-4xl text-amber-950 ">
            {post?.title}
          </h1>
          <p className="mt-5 text-lg md:text-lg">{post?.content}</p>

          <div className="mt-5 mb-5 flex items-center">
            <Vote postId={post?.id as number} />
          </div>

          <CommentContainer postId={post.id} />
        </div>
      ))}
    </main>
  );
}
