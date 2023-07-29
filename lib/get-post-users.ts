'use server';

import { prisma } from '@/prisma/db';

export async function GetPostUser({ profileId }: { profileId: string }) {
  return await prisma.posts.findMany({
    where: {
      authorId: profileId,
    },
    include: {
      author: true,
    },
  });
}
