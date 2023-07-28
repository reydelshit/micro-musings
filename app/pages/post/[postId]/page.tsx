import { prisma } from '@/prisma/db';
import { InputComment } from '@/components/input-comment';
import { Vote } from '@/components/vote';

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
    <main className="w-full min-h-[90vh] bg-gray-100 flex justify-center items-center p-2 flex-col">
      <div className="h-full lg:h-[50%] w-full lg:w-[40%] border-2 mt-5 p-5 bg-white rounded-md">
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
              src={post?.author?.image!}
              alt={post?.author?.image!}
            />
            <span className="font-bold">{post?.author?.name!}</span>
          </div>
        </div>
        <h1 className="font-bold text-4xl">{post?.title}</h1>
        <p className="mt-5 text-md text-left">{post?.content}</p>

        <div className="mt-5 mb-5 flex items-center">
          <Vote postId={post?.id as number} />
        </div>
      </div>
      <InputComment postId={params.postId} />
    </main>
  );
}
