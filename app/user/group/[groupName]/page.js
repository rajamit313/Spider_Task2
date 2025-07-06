"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const GroupPage = ({ params }) => {
  const router = useRouter();
  const groupName = decodeURIComponent(params.groupName);
  const [group, setGroup] = useState(null);
  const [expense, setExpense] = useState({ description: '', amount: '' });

  const fetchGroup = async () => {
    const res = await fetch(`/api/group?name=${groupName}`, {method: 'GET'});
    const data = await res.json();
    if (data.success){
        setGroup(data.group);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  const addExpense = async () => {
    const res = await fetch('/api/group/expense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupName, ...expense })
    });
    const data = await res.json();
    alert(data.message);
    setExpense({ description: '', amount: '' });
    fetchGroup();
  };

  const deleteGroup = async () => {
    const res = await fetch(`/api/group?name=${groupName}`, { method: 'DELETE' });
    const data = await res.json();
    alert(data.message);
    if (data.success) router.push('/viewgroup');
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6">
      {group ? (
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-center text-green-400">{group.name}</h1>
          <p className="text-sm text-gray-400">Category: {group.category}</p>
          <p className="text-sm text-gray-400">Members: {group.members.join(', ')}</p>

          <div className="mt-6">
            <h2 className="text-xl mb-2">Expenses</h2>
            <ul className="space-y-2">
              {group.expenses.map((e, idx) => (
                <li key={idx} className="bg-white/5 border border-white/10 p-2 rounded-md text-sm">
                  ₹{e.amount} - {e.description} by {e.paidBy} on {new Date(e.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 space-y-3">
            <h2 className="text-lg font-semibold">Add Expense</h2>
            <input type="text" placeholder="Description" value={expense.description} onChange={e => setExpense({ ...expense, description: e.target.value })} className="w-full p-2 rounded bg-white/10 text-white border border-white/20" />

            <input type="number" placeholder="Amount" value={expense.amount} onChange={e => setExpense({ ...expense, amount: e.target.value })} className="w-full p-2 rounded bg-white/10 text-white border border-white/20" />

            <button onClick={addExpense} className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md">Submit Expense</button>
          </div>

          <div className="text-center mt-8">
            <button onClick={deleteGroup} className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-md">Delete Group</button>
          </div>
        </div>
      ) : <p className="text-center">Loading...</p>}
    </main>
  );
};

export default GroupPage;
