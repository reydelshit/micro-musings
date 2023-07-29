import { prisma } from '@/prisma/db';
import { Vote } from '@/components/Vote';
import { CommentContainer } from '@/components/CommentContainer';
import Image from 'next/image';

export default async function ReadMore({
  params,
}: {
  params: { postId: number };
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
    <main className="w-full min-h-[90vh] flex justify-center items-center p-2 flex-col">
      <div className="h-full lg:h-[50%] w-full lg:w-[40%] border-2 mt-5 p-5 bg-white rounded-md">
        <div className="flex justify-between mb-2">
          <div className="flex flex-col items-start md:flex-row h-[5rem] md:items-center">
            <span className="text-amber-700 text-sm">
              {post?.createdAt && formatDate(post?.createdAt)}
            </span>
            <p className="md:ml-2 font-bold">{post?.category}</p>
          </div>

          <div className="flex items-center">
            <Image
              className="w-[3rem] md:w-[5rem] rounded-full mr-2"
              src={post?.author?.image!}
              alt={post?.author?.image!}
            />
            <span className="font-bold">{post?.author?.name!}</span>
          </div>
        </div>
        <h1 className="font-bold text-2xl md:text-4xl text-amber-950 hover:text-[#dfa878]">
          {post?.title}
        </h1>
        <p className="mt-5 text-lg md:text-lg">{post?.content}</p>

        <div className="mt-5 mb-5 flex items-center">
          <Vote postId={post?.id as number} />
        </div>
      </div>

      <div className="w-full lg:w-[40%]">
        <CommentContainer postId={params.postId} />
      </div>
    </main>
  );
}
