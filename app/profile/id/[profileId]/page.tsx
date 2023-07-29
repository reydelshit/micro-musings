'use client';

import { prisma } from '@/prisma/db';
import { Vote } from '@/components/Vote';
import { CommentContainer } from '@/components/CommentContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { DeletePost } from '@/lib/delete-post';
import { useEffect, useState } from 'react';
import { GetPostByProfile } from '@/lib/get-posts-profile';
import { Comment, User } from '@prisma/client';
import { UpdateModal } from '@/components/Update';

interface Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  title: string;
  content?: string | null;
  category?: string | null;
  like: number;
  author?: User | null;
  authorId?: string | null;
}

export default function ProfilePage({
  params,
}: {
  params: { profileId: string };
}) {
  const [postByUser, setPostByUser] = useState<Post[]>([]);
  const [updateModal, setShowUpdateModal] = useState(false);
  const [updateId, setUpdateId] = useState<number | null>(null);

  useEffect(() => {
    async function getPosts() {
      const posts = await GetPostByProfile({ profileId: params.profileId });
      if (posts) {
        setPostByUser(posts);
      }
    }

    getPosts();
  }, [params.profileId]);

  const formatDate = (date: Date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const day = dateObj.toLocaleString('default', { day: 'numeric' });
    const year = dateObj.toLocaleString('default', { year: 'numeric' });
    return `${month} ${day}, ${year}`;
  };

  const handleDelete = (e: number) => {
    DeletePost({ postId: e });
  };

  const handleModal = (e: number) => {
    setShowUpdateModal(!updateModal);
    setUpdateId(e);
  };

  return (
    <main className="relative w-full min-h-[90vh] flex justify-center items-center p-2 flex-col">
      {postByUser.map((post) => (
        <div
          key={post.id}
          className="h-full lg:h-[50%] w-full lg:w-[40%] border-2 mt-5 p-5 bg-white rounded-md"
        >
          <div className="flex justify-between mb-2">
            <div className="flex flex-col items-start md:flex-row h-[5rem] md:items-center">
              <span className="text-amber-700 text-sm">
                {post?.createdAt && formatDate(post?.createdAt)}
              </span>
              <p className="md:ml-2 font-bold">{post?.category}</p>
            </div>

            <div className="flex items-center">
              <button onClick={() => handleDelete(post.id)}>
                <FontAwesomeIcon
                  className="text-4xl cursor-pointer"
                  icon={faTrashCan}
                />
              </button>

              <button onClick={() => handleModal(post.id)}>
                <FontAwesomeIcon
                  className="text-4xl ml-2 cursor-pointer"
                  icon={faPenToSquare}
                />
              </button>
            </div>
          </div>
          <h1 className="font-bold text-2xl md:text-4xl text-amber-950 ">
            {post?.title}
          </h1>
          <p className="mt-5 text-lg md:text-lg">{post?.content}</p>

          <div className="mt-5 mb-5 flex items-center">
            <Vote postId={post?.id as number} />
          </div>

          <CommentContainer postId={post.id} />

          {updateModal && updateId === post.id && (
            <UpdateModal
              setShowUpdateModal={setShowUpdateModal}
              updateId={updateId}
            />
          )}
        </div>
      ))}
    </main>
  );
}
