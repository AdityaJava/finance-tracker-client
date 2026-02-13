import { useState, type JSX } from "react";
import loginBg from "../assets/login-bg.jpg";

export default function Login(): JSX.Element {

    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("");

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: `url(${loginBg})` }}>
            {/* <div className="absolute inset-0 bg-black/60"></div> */}
            {/* Card */}

            <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Finance Tracker Login
                </h2>

                <form className="space-y-5" onSubmit={handleSignIn}>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                                    bg-gray-100 
                                    focus:bg-white 
                                    focus:border-blue-500 
                                    focus:ring-2 focus:ring-blue-200 
                                    focus:outline-none 
                                    transition-all duration-200"/>
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                                    bg-gray-100 
                                    focus:bg-white 
                                    focus:border-blue-500 
                                    focus:ring-2 focus:ring-blue-200 
                                    focus:outline-none 
                                    transition-all duration-200"
                        />
                    </div>
                    {/* Normal Sign In */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
                    >
                        Sign In
                    </button>

                    {/* OR Divider */}
                    <div className="flex items-center my-4">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="px-4 text-sm text-gray-500 font-medium">OR</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg transition duration-200 shadow-sm"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Sign in with Google
                    </button>
                </form>
            </div>

        </div>
    );
}