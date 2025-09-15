import React from "react";

export default function Apps() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200 flex flex-col">
            <header className="bg-gradient-to-r from-gray-400 to-gray-200 shadow flex items-center px-8 py-4 justify-between">
                <div className="flex items-center gap-3">
                    <span className="font-extrabold text-2xl text-white tracking-wide">shohojcart</span>
                    <span className="ml-3 bg-white/20 text-xs px-3 py-1 rounded text-white font-semibold">Apps</span>
                </div>
            </header>
            <main className="flex-1 p-10">
                <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Apps</h1>
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                    <p className="text-gray-600 text-lg">This is the Apps page. Manage your apps here.</p>
                </div>
            </main>
        </div>
    );
}
