import { prisma } from '@/prisma/db';
import Link from 'next/link';

export default async function Home() {
  const posts = await prisma.posts.findMany({
    orderBy: {
      createdAt: 'desc',
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
    <main className="w-full h-screen bg-gray-100">
      <div className="w-full flex-col h-full p-5 flex items-center bg-inherit">
        <div className="w-full lg:w-[40%] py-8 md:py-0">
          <h1 className="text-4xl font-bold">
            SEE WHAT MICROWERS ARE POSTING RIGHT NOW..
          </h1>
          <p>enjoy what you are seeing!</p>
        </div>

        {posts.map((post) => {
          return (
            <div
              className="h-full lg:h-[50%] w-full lg:w-[40%] border-2 mt-5 p-5 bg-white rounded-md"
              key={post.id}
            >
              <div className="flex h-[5rem] items-center">
                <span className="mr-2">{formatDate(post.createdAt)}</span>
                <p>{post.category}</p>
              </div>

              <Link
                href={`/pages/post/${post.id}`}
                className="font-bold text-4xl"
              >
                {post.title}
              </Link>
              <p className="mt-5 text-lg">{post.content?.slice(0, 200)}...</p>

              <div className="mt-10 flex items-center">
                <img
                  className="w-[5rem] rounded-full mr-2"
                  src={post.author?.image!}
                  alt={post.author?.image!}
                />
                <span className="font-bold">{post.author?.name!}</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
