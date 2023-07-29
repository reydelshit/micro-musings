'use client';

import { prisma } from '@/prisma/db';
import { useState, useEffect } from 'react';
import { GetPostsUpdate } from '@/lib/get-posts-update';
import { UpdatePost } from '@/lib/update-post';

export function UpdateModal({
  setShowUpdateModal,
  updateId,
}: {
  setShowUpdateModal: any;
  updateId: number;
}) {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function getPostData() {
      const post = await GetPostsUpdate({ postId: updateId });
      if (post) {
        setCategory(post.category!);
        setTitle(post.title);
        setContent(post.content!);
      }
    }

    getPostData();
  }, []);

  const updatePost = async () => {
    UpdatePost({ updateId, category, title, content });
    setShowUpdateModal(false);
  };

  return (
    <div className="top-0 left-0 absolute h-full w-full flex items-center justify-center bg-gray-200 ">
      <div className="h-full lg:h-[80%] w-full lg:w-[35%] border-2 mt-5 py-16 px-8 bg-[#F2EAD3] rounded-md">
        <div className="text-center">
          <h1 className="font-bold text-4xl">Embrace your ideas!</h1>
          <p>let it out!</p>
        </div>
        <form
          className="flex flex-col w-full items-center mt-5"
          onSubmit={updatePost}
        >
          <label className="self-start mt-3 font-bold" htmlFor="caregory">
            Category
          </label>
          <input
            className="w-full border-2 rounded-md p-2 outline-none border-[#3f2305]"
            type="text"
            required
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <label className="self-start mt-3 font-bold" htmlFor="title">
            Title
          </label>

          <input
            className="w-full border-2  p-2 mt-2 outline-none rounded-md border-[#3f2305]"
            type="text"
            required
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="self-start mt-3 font-bold" htmlFor="content">
            Content
          </label>

          <textarea
            className="w-full border-2  p-2 mt-2 outline-none rounded-md border-[#3f2305]"
            required
            id="content"
            name="content"
            cols={30}
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <input
            type="submit"
            className="bg-[#3f2305] hover:bg-[#dfa878] hover:text-[#3f2305] font-bold h-[3rem] w-[8rem] mt-4 cursor-pointer rounded-md text-white"
            value="Update"
          />
        </form>
      </div>
    </div>
  );
}
