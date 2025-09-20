
import React from "react";

export default function Home() {
	return (
		<>
			<h1 className="text-3xl font-extrabold mb-6 text-gray-800">Welcome to ShohojCart</h1>
			<div className="bg-blue-600 text-white rounded-xl p-6 flex items-center justify-between mb-8 shadow-lg">
				<div>
					<div className="font-bold text-lg">Get 6 months for just $1/month</div>
					<div className="text-sm opacity-90">Your trial ends on August 27. Select a plan to continue building.</div>
				</div>
				<button className="bg-white text-blue-700 px-6 py-2 rounded-lg font-bold shadow hover:bg-blue-50 transition">Select a plan</button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-xl border border-blue-100 hover:scale-105 transition-transform">
					<a href="#" className="text-xl font-bold mb-3 underline text-blue-700">Add store name</a>
					<img src="https://cdn-icons-png.flaticon.com/512/3500/3500833.png" alt="Mug" className="h-28 w-28 mb-5 drop-shadow-lg" />
					<div className="font-bold mb-2 text-lg text-gray-800">Add your first product</div>
					<div className="text-gray-500 text-base mb-2 text-center">Start by adding a product and a few key details. Not ready? <a href="#" className="text-blue-600 underline">Start with a sample product</a></div>
				</div>
				<div className="bg-gradient-to-br from-pink-100 via-white to-blue-100 rounded-2xl p-8 flex flex-col items-center shadow-xl border border-pink-100 hover:scale-105 transition-transform">
					<div className="w-full h-28 bg-gradient-to-r from-blue-200 to-cyan-100 rounded-xl mb-5 flex items-center justify-center">
						<span className="text-5xl text-blue-400 font-extrabold">+</span>
					</div>
					<div className="font-bold mb-2 text-lg text-gray-800">Design your store</div>
					<div className="text-gray-500 text-base text-center">Describe your business to generate custom themes or <a href="#" className="text-blue-600 underline">browse pre-designed themes</a></div>
				</div>
			</div>
		</>
	);
}
