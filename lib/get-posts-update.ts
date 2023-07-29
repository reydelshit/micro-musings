'use server';

import { prisma } from '@/prisma/db';

export async function GetPostsUpdate({ postId }: { postId: number }) {
  const postData = await prisma.posts.findUnique({
    where: {
      id: Number(postId),
    },
  });

  return postData;
}
