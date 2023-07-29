'use server';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';

export async function privateRoute() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // The `return` statement is here
    return redirect('/api/auth/signin');
  }
}
