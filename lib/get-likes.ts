'use server';

import { prisma } from '@/prisma/db';

export async function GetLikes({ postId }: { postId: number | undefined }) {
  const likes = await prisma.likes.findMany({
    where: {
      postId: postId,
      disLikeCounter: 0,
    },
  });

  const dislikes = await prisma.likes.findMany({
    where: {
      postId: postId,
      disLikeCounter: 1,
    },
  });

  await prisma.posts.update({
    where: {
      id: postId,
    },
    data: {
      like: likes.length - dislikes.length || dislikes.length - likes.length,
    },
  });

  return likes;
}
