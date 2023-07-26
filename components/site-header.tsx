'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SiteHeader() {
  const { data: session } = useSession();

  const [showLogout, setShowLogout] = useState(false);

  return (
    <header className="w-full flex justify-center bg-gray-100 border-2">
      <nav className="w-full flex items-center py-4 px-10 justify-between ">
        <div className="flex justify-between w-[20rem] font-bold">
          <Link href="/">Micro Musings</Link>
        </div>
        <div className="relative flex justify-around w-[20rem] align-middle items-center font-bold ">
          <Link href="/new-post" className="mr-5">
            New Post
          </Link>
          {session?.user && (
            <img
              onClick={() => setShowLogout(!showLogout)}
              className="w-[5rem] rounded-full"
              src={session.user.image}
              alt="imahe"
            />
          )}

          {showLogout && (
            <div className="flex items-center justify-center absolute bottom-[-6rem] right-6 bg-white w-[8rem] border-2 h-full">
              <span>{session && <SignOut />}</span>
            </div>
          )}

          {!session?.user && <Login />}
        </div>
      </nav>
    </header>
  );
}

function Login() {
  return <button onClick={() => signIn()}>Login</button>;
}

function SignOut() {
  const router = useRouter();

  async function onSignOut() {
    await signOut();
    router.push('/api/auth/signin');
  }

  return <button onClick={onSignOut}>Logout</button>;
}
