'use server';

import { prisma } from '@/prisma/db';
import { useEffect, useState } from 'react';

export async function GetVotes({ postId }: { postId: number | undefined }) {
  const post = await prisma.posts.findUnique({
    where: {
      id: postId,
    },
  });
  return post;
}
