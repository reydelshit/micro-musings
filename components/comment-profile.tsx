'use client';

import { useSession } from 'next-auth/react';

export function CommentProfile() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <img
          className="w-[5rem] h-[5rem] rounded-full"
          src={session.user.image}
          alt="imahe"
        />
      )}
    </>
  );
}
