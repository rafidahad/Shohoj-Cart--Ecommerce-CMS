import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!acceptTerms) {
            setError("You must accept the terms and conditions");
            return;
        }
        setError("");
        // Simulate registration success
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-lime-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-green-100">
                <div className="flex flex-col items-center mb-6">
                    <img src="https://www.bdjobs.com/images/logo.png" alt="logo" className="h-10 mb-2" />
                    <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
                    <p className="text-gray-500 text-sm mt-1">Register to get started with ShohojCart.</p>
                </div>
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full border-0 border-b-2 border-green-200 focus:border-green-500 outline-none px-1 py-2 bg-transparent placeholder-gray-400"
                        placeholder="Full Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        className="w-full border-0 border-b-2 border-green-200 focus:border-green-500 outline-none px-1 py-2 bg-transparent placeholder-gray-400"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4 relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full border-0 border-b-2 border-green-200 focus:border-green-500 outline-none px-1 py-2 bg-transparent placeholder-gray-400"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="button" className="absolute right-2 top-2 text-xs text-green-500" onClick={() => setShowPassword(v => !v)}>
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full border-0 border-b-2 border-green-200 focus:border-green-500 outline-none px-1 py-2 bg-transparent placeholder-gray-400"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center mb-6 mt-2">
                    <input type="checkbox" className="mr-2" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} />
                    <span className="text-sm">I accept the <a href="#" className="text-green-600 underline">terms & conditions</a></span>
                </div>
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition mb-2">Create Account</button>
                <div className="mt-2 text-center text-sm">
                    <span>Already have an account? </span>
                    <button type="button" className="text-green-600 underline font-semibold" onClick={() => navigate("/login")}>Sign In</button>
                </div>
            </form>
        </div>
    );
}
