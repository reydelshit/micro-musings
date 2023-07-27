'use server';

import { prisma } from '@/prisma/db';
import { Posts } from '@prisma/client';

export async function upvotePost(idPost: number | undefined) {
  const post: Posts | null = await prisma.posts.findUnique({
    where: {
      id: idPost,
    },
  });

  if (post) {
    await prisma.posts.update({
      data: {
        like: post.like + 1,
      },
      where: {
        id: idPost,
      },
    });
  }
}

export async function downvotePost(idPost: number | undefined) {
  const post: Posts | null = await prisma.posts.findUnique({
    where: {
      id: idPost,
    },
  });

  if (post) {
    await prisma.posts.update({
      data: {
        like: post.like - 1,
      },
      where: {
        id: idPost,
      },
    });
  }
}
