'use server';

import Link from 'next/link';

import { prisma } from '@/prisma/db';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Vote } from '@/components/Vote';

export default async function Home() {
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
    <main className="w-full h-full mb-[5rem]">
      <div className="w-full flex-col h-full p-5 flex items-center bg-inherit">
        <div className="w-full lg:w-[40%] md:py-0 pr-8 my-[6rem]">
          <h1 className="text-5xl font-bold break-words ">
            SEE WHAT MICROWERS ARE POSTING RIGHT NOW...
          </h1>
          <p className="mt-2">enjoy what you are seeing!</p>
        </div>

        {Array.isArray(posts) &&
          posts.map((post) => {
            return (
              <div
                className="h-full lg:h-[40%] w-full lg:w-[40%] border-2 mt-5 p-3 md:p-5 bg-[#F2EAD3] rounded-md"
                key={post.id}
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
                    <Link href={`/id/${post.author?.id}`} className="font-bold">
                      {post.author?.name!}
                    </Link>
                  </div>
                </div>

                <Link
                  href={`/pages/post/${post.id}`}
                  className="font-bold text-2xl md:text-4xl text-amber-950 hover:text-[#dfa878]"
                >
                  {post.title}
                </Link>
                <p className="mt-5 text-lg md:text-lg">
                  {post.content?.slice(0, 150)}...
                </p>

                <div className="flex items-start flex-col mt-8">
                  <div className="flex items-center w-full justify-between">
                    <Vote postId={post.id} />
                    <Link
                      href={`/pages/post/${post.id}`}
                      className="w-[10rem] font-bold text-[#3f2305] hover:text-[#dfa878] flex items-center "
                    >
                      <FontAwesomeIcon
                        className="fa-comment text-2xl md:text-4xl"
                        style={{
                          color: '#3f2305',
                          marginRight: 8,
                        }}
                        icon={faComments}
                      />
                      Comments
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
