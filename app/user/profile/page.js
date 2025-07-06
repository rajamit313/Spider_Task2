'use client';

import React, { useEffect, useState } from 'react';
import CloudinaryUploader from '@/component/CloudinaryUploader';
import Toast from '@/component/Toast';
import { toast, Bounce } from 'react-toastify';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [editEmail, setEditEmail] = useState(false);
  const [editMobile, setEditMobile] = useState(false);
  const [profilepic, setProfilepic] = useState('/defaultprofilepic.png');
  const [name, setName] = useState('');
  const [editname, setEditname] = useState(false);

  const findData = async () => {
    const res = await fetch('/api/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setUsername(data.username);
    setEmail(data.email);
    setMobile(data.mobile);
    setProfilepic(data.profilepic);
    setName(data.name);
  };

  useEffect(() => {
    findData();
  }, []);

  const saveHandler = async () => {
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, mobile, profilepic, name }),
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
    }
    findData();
  };


  return (
    <>
      <Toast />
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 px-6 py-12 text-white">
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">

          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <img
                src={profilepic}
                alt="Profile"
                className="w-44 h-44 rounded-full object-fill border-2 border-indigo-400 shadow-md" />

              <CloudinaryUploader onUpload={(url) => setProfilepic(url)} />

            </div>
            <div>
              <label className="block text-sm text-indigo-200 mb-1">Username</label>
              <input
                type="text"
                value={username}
                readOnly
                className="w-115 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-indigo-200 mb-1">Name</label>
              <div className="flex items-center gap-3">
                <input
                  type="email"
                  value={name}
                  readOnly={!editname}
                  onChange={(e) => setName(e.target.value)}
                  className={`flex-1 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md ${editname ? 'ring-2 ring-indigo-500' : ''}`}
                />
                <button onClick={() => setEditname(!editname)} className='cursor-pointer'>
                  <lord-icon
                    src="https://cdn.lordicon.com/iubtdgvu.json"
                    trigger="hover"
                    colors="primary:#e8e230,secondary:#e88c30"
                    style={{ width: '35px', height: '35px' }}
                  />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-indigo-200 mb-1">Email</label>
              <div className="flex items-center gap-3">
                <input
                  type="email"
                  value={email}
                  readOnly={!editEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`flex-1 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md ${editEmail ? 'ring-2 ring-indigo-500' : ''}`}
                />
                <button onClick={() => setEditEmail(!editEmail)} className='cursor-pointer'>
                  <lord-icon
                    src="https://cdn.lordicon.com/iubtdgvu.json"
                    trigger="hover"
                    colors="primary:#e8e230,secondary:#e88c30"
                    style={{ width: '35px', height: '35px' }}
                  />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-indigo-200 mb-1">Mobile Number</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={mobile}
                  readOnly={!editMobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={`flex-1 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md ${editMobile ? 'ring-2 ring-indigo-500' : ''}`}
                />
                <button onClick={() => setEditMobile(!editMobile)} className='cursor-pointer'>
                  <lord-icon
                    src="https://cdn.lordicon.com/iubtdgvu.json"
                    trigger="hover"
                    colors="primary:#e8e230,secondary:#e88c30"
                    style={{ width: '35px', height: '35px' }}
                  />
                </button>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={saveHandler}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
