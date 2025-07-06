"use client";

import React, { useState } from 'react';
import Toast from '@/component/Toast';
import { toast, Bounce } from 'react-toastify';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [category, setCategory] = useState('');
  const [memberInput, setMemberInput] = useState('');
  const [members, setMembers] = useState([]);

  const addMember = () => {
    if (memberInput && !members.includes(memberInput)) {
      setMembers([...members, memberInput]);
      setMemberInput('');
    }
  };

  const removeMember = (username) => {
    setMembers(members.filter(member => member !== username));
  };

  const handleSubmit = async () => {
    if (!groupName || !category || members.length === 0) {
      alert("Group name, category, and at least one member are required.");
      return;
    }

    const res = await fetch('/api/creategroup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: groupName, category, members }),
    });

    const data = await res.json();
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

    setGroupName('');
    setCategory('');
    setMembers([]);
  };

  return (
    <>
      <Toast />
      <div className='min-h-screen text-white p-6 bg-neutral-900'>
        <h1 className='text-3xl text-center py-4 text-indigo-400'>Create Group</h1>
        <div className='max-w-xl mx-auto space-y-6'>
          <div>
            <label className='block mb-2 text-indigo-200'>Group Name</label>
            <input type='text' value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder='Enter group name' className='w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white' />
          </div>
          <div>
            <label className='block mb-2 text-indigo-200'>Category</label>
            <input type='text' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='e.g. Trip, Hostel, Food' className='w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white' />
          </div>
          <div>
            <label className='block mb-2 text-indigo-200'>Add Member</label>
            <div className='flex gap-3'>
              <input type='text' value={memberInput} onChange={(e) => setMemberInput(e.target.value)} placeholder='Enter username' className='flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white' />
              <button onClick={addMember} className='bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md'>Add</button>
            </div>
          </div>
          <ul className='space-y-2 w-60'>
            {members.map(member => (
              <li key={member} className='flex justify-between items-center h-10 bg-white/5 p-3 rounded-md border border-white/10'>
                <span>{member}</span>
                <button onClick={() => removeMember(member)} className='text-sm bg-red-500 hover:bg-red-600 px-1.5 py-0.5 rounded-md w-auto'>Remove</button>
              </li>
            ))}
          </ul>
          <div className='text-center'>
            <button onClick={handleSubmit} className='bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-semibold transition'>Create Group</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateGroup;
