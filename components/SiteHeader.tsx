'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export function SiteHeader() {
  const { data: session } = useSession();

  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="w-full flex justify-center bg-inherit border-2">
      <nav className="w-full flex items-center h-[7rem] md:py-4 px-4 md:px-10 justify-between text-xs md:text-base">
        <div className="flex justify-between font-bold">
          <Link href="/">Micro Musings</Link>
        </div>
        <div className="relative flex justify-around w-[10rem] md:w-[20rem] align-middle items-center font-bold ">
          <Link href="/new-post" className="mr-5 flex items-center">
            <FontAwesomeIcon
              style={{
                fontSize: 30,
                color: '#3f2305',
                marginRight: 8,
              }}
              icon={faPenToSquare}
            />
            new post
          </Link>
          {session?.user && (
            <img
              onClick={() => setShowMenu(!showMenu)}
              className="w-[5rem] rounded-full cursor-pointer"
              src={session.user.image}
              alt="imahe"
            />
          )}

          {showMenu && (
            <div className="flex items-center flex-col justify-center absolute bottom-[-6rem] right-6 bg-white w-[8rem] border-2 h-full">
              <Link href={`/profile/id/${session?.user.id}`}>Profile</Link>
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
