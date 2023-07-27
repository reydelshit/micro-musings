import { prisma } from '@/prisma/db';
import { useSession } from 'next-auth/react';
import { CommentProfile } from './comment-profile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';

export async function InputComment({ postId }: { postId: string }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  async function addComment(formData: FormData) {
    'use server';

    const content = String(formData.get('content'));
    const postIdforPost = postId;
    const authorId = session?.user.id;

    await prisma.comment.create({
      data: {
        content,
        postId: parseInt(postIdforPost),
        authorId,
      },
    });
  }

  const com = await prisma.comment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
    },
    take: 100,
  });

  return (
    <div className="h-full lg:h-[50%] w-full lg:w-[40%] border-2 mt-5 p-5 bg-white rounded-md">
      <div className="flex flex-col">
        <div className="h-full">
          {com
            .filter((co) => co.postId === parseInt(postId))
            .map((co) => {
              return (
                <div className="flex items-center mb-2" key={co.id}>
                  <img
                    className="rounded-full w-[3rem] h-[3rem] mr-2"
                    src={co.author?.image!}
                    alt={co.author?.name}
                  />
                  <p>{co.content}</p>
                </div>
              );
            })}
        </div>

        <form action={addComment}>
          <div className="flex justify-between items-center">
            <CommentProfile />
            <input
              name="content"
              type="text"
              className="border-2 w-[85%] h-[7rem] mt-2 outline-none px-2"
            />
          </div>

          <input
            type="submit"
            className="self-end mt-2 bg-slate-400 p-2 w-[8rem]"
          />
        </form>
      </div>
    </div>
  );
}
