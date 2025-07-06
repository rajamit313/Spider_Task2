'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center text-white px-6 relative">
        <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">Welcome!</h1>
        <p className="text-lg text-indigo-200 mb-8 text-center">
          Manage your travel group, split expenses, and settle up smoothly.
        </p>

        <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
        
          <Link
            href="/user/creategroup"
            className="w-full sm:w-[45%] bg-white/10 border border-white/20 backdrop-blur-md text-white p-6 rounded-xl shadow-lg hover:bg-indigo-600/20 transition">
            <h2 className="text-2xl font-semibold mb-2">Create Group</h2>
            <p className="text-sm text-indigo-200">Start a new bill splitting group</p>
          </Link>

          
          <Link
            href="/user/viewgroup"
            className="w-full sm:w-[45%] bg-white/10 border border-white/20 backdrop-blur-md text-white p-6 rounded-xl shadow-lg hover:bg-indigo-600/20 transition">
            <h2 className="text-2xl font-semibold mb-2">View Groups</h2>
            <p className="text-sm text-indigo-200">Access your active groups</p>
          </Link>

        
          <Link
            href="/user/friend"
            className="w-full sm:w-[45%] bg-white/10 border border-white/20 backdrop-blur-md text-white p-6 rounded-xl shadow-lg hover:bg-indigo-600/20 transition">
            <h2 className="text-2xl font-semibold mb-2">View Friends</h2>
            <p className="text-sm text-indigo-200">Connect with people you travel with</p>
          </Link>

         
          <Link
            href="/user/profile"
            className="w-full sm:w-[45%] bg-white/10 border border-white/20 backdrop-blur-md text-white p-6 rounded-xl shadow-lg hover:bg-indigo-600/20 transition">
            <h2 className="text-2xl font-semibold mb-2">Your Profile</h2>
            <p className="text-sm text-indigo-200">View and update your account details</p>
          </Link>
        </div>
      </main>
    </>
  );
}
