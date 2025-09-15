import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Email and password required");
            return;
        }
        setError("");
        // Simulate login success
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-cyan-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-blue-100">
                <div className="flex flex-col items-center mb-6">
                    <img src="https://www.bdjobs.com/images/logo.png" alt="logo" className="h-10 mb-2" />
                    <h2 className="text-2xl font-bold text-gray-800">Sign in to your account</h2>
                    <p className="text-gray-500 text-sm mt-1">Welcome back! Please login to continue.</p>
                </div>
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                <div className="mb-4">
                    <input
                        type="email"
                        className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 outline-none px-1 py-2 bg-transparent placeholder-gray-400"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-2 relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 outline-none px-1 py-2 bg-transparent placeholder-gray-400"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="button" className="absolute right-2 top-2 text-xs text-blue-500" onClick={() => setShowPassword(v => !v)}>
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <div className="flex items-center justify-between mb-6 mt-2">
                    <label className="flex items-center text-sm">
                        <input type="checkbox" className="mr-2" checked={remember} onChange={e => setRemember(e.target.checked)} />
                        Remember me
                    </label>
                    <button type="button" className="text-blue-500 text-sm hover:underline" onClick={() => alert('Forgot password?')}>Forgot password?</button>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition mb-2">Sign In</button>
                <div className="mt-2 text-center text-sm">
                    <span>Don't have an account? </span>
                    <button type="button" className="text-blue-600 underline font-semibold" onClick={() => navigate("/register")}>Create Account</button>
                </div>
            </form>
        </div>
    );
}
