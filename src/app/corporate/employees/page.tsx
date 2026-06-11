'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Users, UserPlus, FileUp, Trash2, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';

export default function CorporateEmployees() {
  const { session, role, loginAs } = useAuth();
  const [employees, setEmployees] = useState([
    { id: 'e1', name: 'Amit Verma', email: 'amit.v@infosys.com', creditsUsed: 14, status: 'active' },
    { id: 'e2', name: 'Priya Sharma', email: 'priya.s@infosys.com', creditsUsed: 22, status: 'active' },
    { id: 'e3', name: 'Vikash Dwivedi', email: 'vikash.d@infosys.com', creditsUsed: 8, status: 'active' },
    { id: 'e4', name: 'Neha Gupta', email: 'neha.g@infosys.com', creditsUsed: 0, status: 'invited' },
  ]);

  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');

  if (role !== 'corporate-hr' || !session) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-lg space-y-4">
        <h3 className="text-xl font-bold text-zinc-950 dark:text-white">Corporate HR Mock Sandbox</h3>
        <p className="text-zinc-500 text-xs">
          Please select the <b>Corporate HR</b> role in the sandbox switcher to view this page.
        </p>
        <button
          onClick={() => loginAs('corporate-hr')}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all cursor-pointer"
        >
          Login as HR Admin
        </button>
      </div>
    );
  }

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newName) return;
    setEmployees([
      ...employees,
      { id: 'e' + (employees.length + 1), name: newName, email: newEmail, creditsUsed: 0, status: 'invited' }
    ]);
    setNewEmail('');
    setNewName('');
    alert('Employee allocation invitation sent successfully.');
  };

  const handleRemoveEmployee = (id: string) => {
    if (confirm("Are you sure you want to remove this employee's corporate plan?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <Link
        href="/corporate/dashboard"
        className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 group"
      >
        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to HR Dashboard</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Employees Table List */}
        <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-zinc-150 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">Active Employee Enrollments</h3>
            <span className="text-xs text-zinc-500">{employees.length} Seats Filled</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Name</th>
                  <th className="p-4">Work Email</th>
                  <th className="p-4">Credits Used</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/50">
                    <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">{emp.name}</td>
                    <td className="p-4 text-zinc-500">{emp.email}</td>
                    <td className="p-4 font-semibold text-brand-primary">{emp.creditsUsed} Credits</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        emp.status === 'active' 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' 
                          : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-500'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleRemoveEmployee(emp.id)}
                        className="text-rose-500 hover:text-rose-600 p-1.5 rounded hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer"
                        title="Revoke seat"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Employee Sidebar */}
        <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="text-left space-y-1">
            <UserPlus className="h-6 w-6 text-indigo-650" />
            <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">Invite Employee</h3>
            <p className="text-xs text-zinc-500">Add an employee seat instantly under your corporate plan.</p>
          </div>

          <form onSubmit={handleAddEmployee} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1.5">Full Name</label>
              <input
                required
                type="text"
                placeholder="Rahul Kumar"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-855 bg-zinc-50 dark:bg-zinc-950 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1.5">Work Email Address</label>
              <input
                required
                type="email"
                placeholder="rahul.k@infosys.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-855 bg-zinc-50 dark:bg-zinc-950 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-650 hover:bg-indigo-700 text-white font-bold rounded-xl text-center shadow cursor-pointer text-xs"
            >
              Send Invitation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
