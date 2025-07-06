'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Toast from '@/component/Toast';
import { toast, Bounce } from 'react-toastify';

export default function SignUpPage() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (data.success) {
                toast(data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                  
                });
                setTimeout(()=>{
                    router.push('/login');
                },1500);
                
            } else {
                toast(data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (err) {
            toast(data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    return (
        <>
            <Toast />
            <main className="min-h-screen flex items-center justify-center text-white relative">
                <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-white/10">
                    <h2 className="text-3xl font-bold text-center mb-6 text-indigo-300">Create an Account</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm mb-1" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={form.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white" />
                        </div>

                        <div>
                            <label className="block text-sm mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white" />
                        </div>

                        <div>
                            <label className="block text-sm mb-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white" />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white font-semibold shadow-md transition">
                            Sign Up
                        </button>
                    </form>

                    <p className="text-sm text-center mt-6 text-indigo-200">
                        Already have an account?{' '}
                        <Link href="/login" className="text-indigo-400 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </main>
        </>
    );
}
