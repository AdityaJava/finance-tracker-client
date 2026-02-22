import React, { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/login-bg.jpg";
import type { RegisterRequest } from "../types/auth.types";
import { signUp } from "../js/Authentication";
import axios from "axios";

export default function Register(): JSX.Element {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterRequest>({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        if (!formData.username || !formData.password || !formData.email || !formData.confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (formData.password != formData.confirmPassword) {
            setError("Password should match with Confirm Password")
            return;
        }
        try {
            await signUp(formData);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const data = error.response?.data;
                if (typeof data === "object" && data !== null) {
                    setFieldErrors(data);
                }
            } else {
                setError("Something went wrong");
            }
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Create Account
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 
                                   focus:bg-white focus:border-blue-500 focus:ring-2 
                                   focus:ring-blue-200 focus:outline-none transition"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 
                                   focus:bg-white focus:border-blue-500 focus:ring-2 
                                   focus:ring-blue-200 focus:outline-none transition"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 
                                   focus:bg-white focus:border-blue-500 focus:ring-2 
                                   focus:ring-blue-200 focus:outline-none transition"
                    />
                    {fieldErrors.password && (<p className="text-red-500">{fieldErrors.password}</p>)}

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 
                                   focus:bg-white focus:border-blue-500 focus:ring-2 
                                   focus:ring-blue-200 focus:outline-none transition"
                    />

                    {error && (
                        <p className="text-red-500 text-sm font-medium">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white 
                                   font-semibold py-3 rounded-lg transition duration-200 shadow-md"
                    >
                        Sign Up
                    </button>

                    <p className="text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-blue-600 cursor-pointer font-medium"
                        >
                            Sign In
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}