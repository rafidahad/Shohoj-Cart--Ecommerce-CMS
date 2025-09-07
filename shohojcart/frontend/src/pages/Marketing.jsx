import React from "react";

export default function Marketing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50 flex flex-col">
      <header className="bg-gradient-to-r from-green-400 to-lime-400 shadow flex items-center px-8 py-4 justify-between">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-2xl text-white tracking-wide">shohojcart</span>
          <span className="ml-3 bg-white/20 text-xs px-3 py-1 rounded text-white font-semibold">Marketing</span>
        </div>
      </header>
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Marketing</h1>
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100">
          <p className="text-gray-600 text-lg">This is the Marketing page. Manage your marketing campaigns here.</p>
        </div>
      </main>
    </div>
  );
}
