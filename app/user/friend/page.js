'use client';

import React, { useEffect, useState } from 'react';
import Toast from '@/component/Toast';
import { toast, Bounce } from 'react-toastify';

const FriendPage = () => {
    const [friends, setFriends] = useState([]);
    const [newFriend, setNewFriend] = useState('');
    const [newRequest, setNewRequest] = useState([]);

    //Get friends and requests
    const fetchFriends = async () => {
        const res = await fetch('/api/friend', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        setFriends(data.friendData || []);
        setNewRequest(data.friendRequestData || []);
        console.log(newRequest)
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    //Give friend request
    const sendRequest = async () => {
        if (!newFriend) return;
        const res = await fetch('/api/friend', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ friendUsername: newFriend }),
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

        setNewFriend('');
        fetchFriends();
    };
    //Remove friends
    const rejectFriend = async (friendUsername) => {
        await fetch(`/api/friendrequesthandle?friendUsername=${friendUsername}`, {
            method: 'DELETE',
        });
        fetchFriends();
    };

    return (
        <>
            <Toast />
            <main className="min-h-screen bg-neutral-950 text-white p-6">
                <div className="max-w-lg mx-auto space-y-6">
                    <h1 className="text-3xl font-bold text-indigo-300">Your Friends</h1>

                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={newFriend}
                            onChange={(e) => setNewFriend(e.target.value)}
                            placeholder="Enter username"
                            className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white" />
                        <button
                            onClick={sendRequest}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md font-semibold">
                            Send request
                        </button>
                    </div>

                    <ul className="space-y-3">
                        {newRequest.map((request) => (
                            <div key={request.username} className="flex justify-between items-center text-white bg-white/5 p-4 rounded-md border border-white/10">
                                <li className='flex flex-col justify-center'>
                                    <span>@{request.username}</span>
                                    <span>Name: {request.name}</span>
                                </li>
                                <div className='flex justify-center gap-3'>
                                    <button onClick={() => addFriend(request.username)} className="text-sm bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md">
                                        Accept
                                    </button>
                                    <button onClick={() => rejectFriend(request.username)} className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                        {friends.map((friend) => (
                            <div key={friend.username} className="flex justify-between items-center text-white bg-white/5 p-4 rounded-md border border-white/10">
                                <li className='flex flex-col justify-center'>
                                    <span>@{friend.username}</span>
                                    <span>Name: {friend.name}</span>
                                </li>
                                <button onClick={() => removeFriend(friend.username)} className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    );
};

export default FriendPage;
