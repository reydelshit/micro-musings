'use server';

import { prisma } from '@/prisma/db';

export async function GetDislike({ postId }: { postId: number | undefined }) {
  const dislike = await prisma.likes.findMany({
    where: {
      postId: postId,
      disLikeCounter: 1,
    },
  });

  return dislike;
}
