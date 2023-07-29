'use server';

import { prisma } from '@/prisma/db';

export async function GetCommentsForPost({ postId }: { postId: number }) {
  return await prisma.comment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: true,
    },
    where: {
      postId: Number(postId),
    },
  });
}
