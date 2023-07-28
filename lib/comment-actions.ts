'use server';

import { prisma } from '@/prisma/db';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';

export async function addComment(formData: FormData, postId: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const content = String(formData.get('content'));
  const postIdforPost = postId;
  const authorId = session?.user.id;

  await prisma.comment.create({
    data: {
      content,
      postId: parseInt(postIdforPost),
      authorId,
    },
  });
}
