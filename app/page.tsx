'use server';

import Link from 'next/link';

import { prisma } from '@/prisma/db';
import { Vote } from '@/components/vote';

import { GetLikes } from '@/lib/getLike-actions';
import { GetDislike } from '@/lib/getDislike-actions';

export default async function Home() {
  // const likes = await GetLikes({ postId });
  // const dislikes = await GetDislike({ postId });

  // const currentLikes =
  //   likes.length - dislikes.length || dislikes.length - likes.length;

  const posts = await prisma.posts.findMany({
    orderBy: {
      like: 'desc',
    },
    include: {
      author: true,
    },
    take: 100,
  });

  const formatDate = (date: Date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const day = dateObj.toLocaleString('default', { day: 'numeric' });
    const year = dateObj.toLocaleString('default', { year: 'numeric' });
    return `${month} ${day}, ${year}`;
  };

  return (
    <main className="w-full h-screen bg-gray-100">
      <div className="w-full flex-col h-full p-5 flex items-center bg-inherit">
        <div className="w-full lg:w-[40%] py-8 md:py-0">
          <h1 className="text-4xl font-bold">
            SEE WHAT MICROWERS ARE POSTING RIGHT NOW..
          </h1>
          <p>enjoy what you are seeing!</p>
        </div>

        {Array.isArray(posts) &&
          posts.map((post) => {
            return (
              <div
                className="h-full lg:h-[40%] w-full lg:w-[40%] border-2 mt-5 p-5 bg-white rounded-md"
                key={post.id}
              >
                <div className="flex justify-between mb-2">
                  <div className="flex h-[5rem] items-center">
                    <span className="text-gray-500 text-sm">
                      {post?.createdAt && formatDate(post?.createdAt)}
                    </span>
                    <p className="ml-2 font-bold">{post?.category}</p>
                  </div>

                  <div className="flex items-center">
                    <img
                      className="w-[5rem] rounded-full mr-2"
                      src={post.author?.image!}
                      alt={post.author?.image!}
                    />
                    <span className="font-bold">{post.author?.name!}</span>
                  </div>
                </div>

                <Link
                  href={`/pages/post/${post.id}`}
                  className="font-bold text-4xl"
                >
                  {post.title}
                </Link>
                <p className="mt-5 text-lg">{post.content?.slice(0, 200)}...</p>

                <div className="flex items-start flex-col mt-10">
                  <div className="flex items-center w-full justify-between mt-5  gap-5">
                    <Vote postId={post.id} />
                    <Link
                      href={`/pages/post/${post.id}`}
                      className="w-[5rem] text-orange-500"
                    >
                      Comment
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
