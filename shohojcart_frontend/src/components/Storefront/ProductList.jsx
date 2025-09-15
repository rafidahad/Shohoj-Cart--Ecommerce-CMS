import ProductCard from "./ProductCard";
import { useState } from "react";

const sampleProducts = [
	{
		id: 1,
		name: "Wooden Lamp Base",
		price: 850,
		originalPrice: 1200,
		image: "/assets/wooden-base.jpg",
	},
	{
		id: 2,
		name: "USB Power Cable",
		price: 150,
		image: "/assets/usb-cable.jpg",
	},
	{
		id: 3,
		name: "LED with Remote",
		price: 550,
		originalPrice: 750,
		image: "/assets/led-remote.jpg",
	},
	{
		id: 4,
		name: "Crystal Glass Ball",
		price: 2200,
		image: "/assets/crystal-ball.jpg",
	},
];

export default function ProductList() {
	const [viewMode, setViewMode] = useState("grid");
	const [sortBy, setSortBy] = useState("featured");

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
			{/* Hero Section */}
			<section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
				<div className="relative max-w-7xl mx-auto text-center">
					<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
						Discover Amazing
						<span
							className="block text-gradient animate-fade-in-up"
							style={{ animationDelay: "0.2s" }}
						>
							Products
						</span>
					</h1>
					<p
						className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up"
						style={{ animationDelay: "0.4s" }}
					>
						Explore our curated collection of premium products designed to
					 enhance your lifestyle
					</p>
					<div
						className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
						style={{ animationDelay: "0.6s" }}
					>
						<button className="btn btn-primary shadow-dramatic">Shop Now</button>
						<button className="btn btn-secondary">View Categories</button>
					</div>
				</div>
			</section>

			{/* Filters and Controls */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
				<div className="card shadow-elegant p-6">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
						<div className="flex items-center space-x-4">
							<h2 className="text-2xl font-bold text-gray-900">
								Featured Products
							</h2>
							<span className="badge badge-primary">
								{sampleProducts.length} items
							</span>
						</div>

						<div className="flex items-center space-x-4">
							{/* Sort Dropdown */}
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="form-input w-auto"
							>
								<option value="featured">Featured</option>
								<option value="price-low">Price: Low to High</option>
								<option value="price-high">Price: High to Low</option>
								<option value="newest">Newest</option>
								<option value="rating">Rating</option>
							</select>

							{/* View Mode Toggle */}
							<div className="flex items-center bg-gray-100 rounded-lg p-1">
								<button
									onClick={() => setViewMode("grid")}
									className={`p-2 rounded-md transition-all ${
										viewMode === "grid"
											? "bg-white shadow-sm text-blue-600"
											: "text-gray-400"
									}`}
								>
									<svg
										className="h-5 w-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
										/>
									</svg>
								</button>
								<button
									onClick={() => setViewMode("list")}
									className={`p-2 rounded-md transition-all ${
										viewMode === "list"
											? "bg-white shadow-sm text-blue-600"
											: "text-gray-400"
									}`}
								>
									<svg
										className="h-5 w-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6h16M4 10h16M4 14h16M4 18h16"
										/>
									</svg>
								</button>
							</div>

							{/* Filter Button */}
							<button className="btn btn-secondary">
								<svg
									className="h-4 w-4 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
									/>
								</svg>
								Filters
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Products Grid */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
				<div
					className={`grid gap-6 ${
						viewMode === "grid"
							? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
							: "grid-cols-1 max-w-4xl mx-auto"
					}`}
				>
					{sampleProducts.map((product, index) => (
						<div
							key={product.id}
							className="animate-fade-in-up"
							style={{ animationDelay: `${index * 100}ms` }}
						>
							<ProductCard product={product} />
						</div>
					))}
				</div>

				{/* Load More Button */}
				<div className="text-center mt-12">
					<button className="btn btn-secondary shadow-elegant">
						Load More Products
					</button>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className="bg-gradient-primary py-16 relative overflow-hidden">
				<div className="absolute inset-0 bg-black/10"></div>
				<div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
					<h3 className="text-3xl font-bold text-white mb-4 animate-fade-in-up">
						Stay Updated with Latest Products
					</h3>
					<p
						className="text-blue-100 mb-8 animate-fade-in-up"
						style={{ animationDelay: "0.2s" }}
					>
						Subscribe to our newsletter and get 10% off your first order
					</p>
					<div
						className="flex flex-col sm:flex-row max-w-md mx-auto gap-4 animate-fade-in-up"
						style={{ animationDelay: "0.4s" }}
					>
						<input
							type="email"
							placeholder="Enter your email"
							className="form-input flex-1 bg-white/90 border-0 focus:bg-white"
						/>
						<button className="btn btn-secondary bg-white text-blue-600 hover:bg-gray-50 border-0 shadow-elegant">
							Subscribe
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
