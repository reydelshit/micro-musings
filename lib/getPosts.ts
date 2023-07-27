import { prisma } from '@/prisma/db';

type Post = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  title: string;
  content?: string | null;
  category?: string | null;
  author: {
    id: string;
    name: string;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  // Add other properties of a post here
};

type PostsResponse = {
  posts: Post[];
};

export async function getPosts(): Promise<PostsResponse> {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
      },
      take: 100,
    });
    return { posts };
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error to handle it outside of this function
  }
}
