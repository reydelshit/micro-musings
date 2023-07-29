'use server';

import { prisma } from '@/prisma/db';

export async function UpdatePost({
  updateId,
  category,
  title,
  content,
}: {
  updateId: number;
  category: string;
  title: string;
  content: string;
}) {
  const data = {
    category,
    title,
    content,
  };

  await prisma.posts.update({
    where: {
      id: updateId,
    },
    data,
  });
}
