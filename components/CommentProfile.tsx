'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

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
