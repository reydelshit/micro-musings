import { prisma } from '@/prisma/db';
import { useSession } from 'next-auth/react';

export default async function ReadMore({
  params,
}: {
  params: { postId: string };
}) {
  const post = await prisma.posts.findUnique({
    where: {
      id: Number(params.postId),
    },
    include: {
      author: true,
    },
  });

  const formatDate = (date: Date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const day = dateObj.toLocaleString('default', { day: 'numeric' });
    const year = dateObj.toLocaleString('default', { year: 'numeric' });
    return `${month} ${day}, ${year}`;
  };

  return (
    <main className="w-full min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="relative w-[90%] sm:w-[70%] lg:w-[40%] border-2 mt-[-8rem] px-5 bg-white rounded-md">
        <div className="flex h-[5rem] items-center justify-between">
          <div className="flex">
            <span className="mr-2">
              {post?.createdAt && formatDate(post?.createdAt)}
            </span>
            <p>{post?.category}</p>
          </div>
        </div>

        <h1 className="font-bold text-4xl">{post?.title}</h1>
        <p className="mt-5 text-md text-left">{post?.content}</p>

        <div className="mt-10 mb-5 flex items-center">
          <img
            className="w-[5rem] rounded-full mr-2"
            src={post?.author?.image!}
            alt={post?.author?.image!}
          />
          <span className="font-bold">{post?.author?.name!}</span>
        </div>
      </div>
    </main>
  );
}
