import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/prisma/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  async function addPost(formData: FormData) {
    'use server';

    const title = String(formData.get('title'));
    const content = String(formData.get('content'));
    const category = String(formData.get('category'));
    const authorId = session?.user.id;
    await prisma.posts.create({
      data: {
        title,
        content,
        category,
        authorId,
      },
    });

    redirect('/');
  }

  return (
    <div className="w-full min-h-[90vh] flex justify-center items-center p-2 ">
      <div className="h-full lg:h-[50%] w-full lg:w-[35%] border-2 mt-5 py-16 px-8 bg-[#F2EAD3] rounded-md">
        <div className="text-center">
          <h1 className="font-bold text-4xl">Embrace your ideas!</h1>
          <p>let it out!</p>
        </div>
        <form
          className="flex flex-col w-full items-center mt-5"
          action={addPost}
        >
          {/* options  */}

          <label className="self-start mt-3 font-bold" htmlFor="caregory">
            Category
          </label>
          <input
            className="w-full border-2 rounded-md p-2 outline-none border-[#3f2305]"
            type="text"
            required
            name="category"
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
          ></textarea>

          <input
            type="submit"
            className="bg-[#3f2305] hover:bg-[#dfa878] hover:text-[#3f2305] font-bold h-[3rem] w-[8rem] mt-4 cursor-pointer rounded-md text-white"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
}
