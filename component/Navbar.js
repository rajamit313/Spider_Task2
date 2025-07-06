"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [userNav, setUserNav] = useState(false);
  const Path = usePathname();

 useEffect(() => {
    setUserNav(Path.startsWith("/user"));
  }, [Path]);

  const logout = async () => {
    const res = await fetch('/api/logout', {
      method: 'POST',
    });
    const data = await res.json();
    if (data.success) {
      router.push("/");
    }
  }

  return (
    <nav className="sticky top-0 left-0 w-full z-10 bg-white/10 backdrop-blur-md border-b border-white/20 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-wider text-indigo-300 hover:text-white transition">
          SplitEase
        </Link>
        <div className="space-x-6 text-sm md:text-base">
          <Link href="/about" className="hover:text-indigo-300 transition">About</Link>
          {userNav ? <button onClick={logout} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white shadow">
            Log out</button>
           : <Link href={'/login'} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white shadow">
            Login
          </Link>}

        </div>
      </div>
    </nav>
  );
}
