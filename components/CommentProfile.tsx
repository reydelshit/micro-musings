'use client';

import { useSession } from 'next-auth/react';

export function CommentProfile() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <img
          className="w-[3rem] md:w-[5rem] rounded-full mr-2"
          src={session.user.image}
          alt="imahe"
        />
      )}
    </>
  );
}
