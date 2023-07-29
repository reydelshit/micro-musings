'use server';

import { prisma } from '@/prisma/db';

export async function DeletePost({ postId }: { postId: number }) {
  const deletePost = await prisma.posts.delete({
    where: {
      id: Number(postId),
    },
  });

  return deletePost;
}
