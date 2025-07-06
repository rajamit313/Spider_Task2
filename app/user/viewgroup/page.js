"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ViewGroup = () => {
  const [groups, setGroups] = useState([]);
  const router = useRouter();

  const fetchGroups = async () => {
    const res = await fetch('/api/viewgroup', { method: 'GET' });
    const data = await res.json();
    if (data.success) setGroups(data.groups);
  };

  useEffect(() => { 
    fetchGroups();
 }, []);

  return (
    <main className="min-h-screen text-white bg-neutral-950 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Groups</h1>
      <div className="max-w-2xl mx-auto space-y-6">
        {groups.map(group => (
          <div key={group._id} className="p-4 bg-white/5 rounded-md border border-white/10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-green-400">{group.name}</h2>
              <button onClick={() => router.push(`/user/group/${group.name}`)} className="bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-500">Manage</button>
            </div>
            <h3 className='font-normal'>Category: {group.category}</h3>
            <p className="text-md text-gray-400">Members: {group.members.join(', ')}</p>
            <p className="text-md text-gray-400">Created By: {group.createdBy}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ViewGroup;
