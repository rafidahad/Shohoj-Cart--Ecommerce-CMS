
import React from "react";
import { useNavigate } from "react-router-dom";

const sidebarLinks = [
	{ label: "Home", icon: "home", color: "bg-gradient-to-r from-blue-500 to-cyan-400", path: "/" },
	{ label: "Orders", icon: "shopping_cart", color: "bg-gradient-to-r from-purple-500 to-pink-400", path: "/orders" },
	{ label: "Products", icon: "inventory_2", color: "bg-gradient-to-r from-green-400 to-lime-400", path: "/products" },
	{ label: "Customers", icon: "people", color: "bg-gradient-to-r from-yellow-400 to-orange-400", path: "/customers" },
	{ label: "Marketing", icon: "campaign", color: "bg-gradient-to-r from-pink-500 to-red-400", path: "/marketing" },
	{ label: "Discounts", icon: "local_offer", color: "bg-gradient-to-r from-indigo-400 to-blue-400", path: "/discounts" },
	{ label: "Content", icon: "article", color: "bg-gradient-to-r from-teal-400 to-cyan-400", path: "/content" },
	{ label: "Markets", icon: "public", color: "bg-gradient-to-r from-amber-400 to-yellow-300", path: "/markets" },
	{ label: "Analytics", icon: "bar_chart", color: "bg-gradient-to-r from-rose-400 to-pink-300", path: "/analytics" },
	{ label: "Online Store", icon: "storefront", color: "bg-gradient-to-r from-blue-400 to-cyan-300", path: "/onlinestore" },
	{ label: "Apps", icon: "apps", color: "bg-gradient-to-r from-gray-400 to-gray-200", path: "/apps" },
	{ label: "Settings", icon: "settings", color: "bg-gradient-to-r from-gray-500 to-gray-300", path: "/settings" },
];


export default function Home() {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col">
			{/* Header */}
			<header className="bg-gradient-to-r from-blue-600 to-cyan-400 shadow flex items-center px-8 py-4 justify-between">
				<div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
					{/* Custom Shop Logo SVG */}
					<span className="inline-block h-9 w-9">
						<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="40" height="40" rx="10" fill="url(#paint0_linear)" />
							<path d="M12 28V16a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H14a2 2 0 01-2-2z" fill="#fff" />
							<path d="M16 18h8v8h-8z" fill="#38bdf8" />
							<circle cx="20" cy="24" r="2" fill="#0ea5e9" />
							<defs>
								<linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
									<stop stopColor="#38bdf8" />
									<stop offset="1" stopColor="#0ea5e9" />
								</linearGradient>
							</defs>
						</svg>
					</span>
					<span className="font-extrabold text-2xl text-white tracking-wide">shohojcart</span>
				</div>
				<div className="flex items-center gap-4">
					<button className="text-white hover:bg-white/20 p-2 rounded-full"><span className="material-icons">search</span></button>
					<button className="text-white hover:bg-white/20 p-2 rounded-full"><span className="material-icons">account_circle</span></button>
					<button className="text-white hover:bg-white/20 p-2 rounded-full"><span className="material-icons">notifications</span></button>
					<div className="bg-gradient-to-r from-green-400 to-lime-400 text-white px-4 py-1 rounded-full font-bold shadow">MS</div>
				</div>
			</header>

			<div className="flex flex-1">
				{/* Sidebar */}
				<aside className="w-64 min-h-full py-6 px-2 flex flex-col gap-2 shadow-xl rounded-xl m-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border border-gray-800">
					<nav className="flex flex-col gap-1 mt-2">
						{sidebarLinks.map((link) => (
							<SidebarLink key={link.label} label={link.label} path={link.path} />
						))}
					</nav>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-10">
					<h1 className="text-3xl font-extrabold mb-6 text-gray-800">Welcome to ShohojCart</h1>
					<div className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-xl p-6 flex items-center justify-between mb-8 shadow-lg">
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
				</main>
			</div>
		</div>
	);
}

function SidebarLink({ label, path }) {
	const navigate = useNavigate();
	const isActive = window.location.pathname === path;
	return (
		<div
			onClick={() => navigate(path)}
			className={`flex items-center gap-3 px-4 py-2 my-1 rounded-lg text-base font-semibold cursor-pointer select-none transition-all duration-150
				${isActive ? "bg-gradient-to-r from-green-500 to-lime-400 text-white shadow-lg" : "text-gray-200 hover:bg-gray-800 hover:text-white"}
			`}
		>
			<span className="tracking-wide">{label}</span>
		</div>
	);
}
