'use server';

import { prisma } from '@/prisma/db';

export async function GetVotes({ postId }: { postId: number | undefined }) {
  const post = await prisma.posts.findUnique({
    where: {
      id: postId,
    },
  });
  return post;
}
