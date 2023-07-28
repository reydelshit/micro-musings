'use server';

import { prisma } from '@/prisma/db';
import { Posts } from '@prisma/client';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export async function upvotePost(idPost: number | undefined) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const likes = await prisma.likes.findMany({
    where: {
      postId: idPost,
      userId: session?.user.id,
    },
  });

  if (likes.length > 0) {
    console.log('User is already liked it');
  } else {
    await prisma.likes.create({
      data: {
        postId: idPost as number,
        userId: session?.user.id,
      },
    });
  }
}

export async function downvotePost(idPost: number | undefined) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const likes = await prisma.likes.findMany({
    where: {
      postId: idPost,
      userId: session?.user.id,
    },
  });

  if (likes.length === 0) {
    await prisma.likes.create({
      data: {
        postId: idPost as number,
        userId: session?.user.id,
        disLikeCounter: 1,
      },
    });
  } else {
    await prisma.likes.delete({
      where: {
        id: likes[0].id,
      },
    });
  }
}
