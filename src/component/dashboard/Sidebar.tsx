import type { JSX } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    {
        to: "/accounts",
        label: "Accounts",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
        ),
    },
    {
        to: "/categories",
        label: "Categories",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
            </svg>
        ),
    },
    {
        to: "/transactions",
        label: "Transactions",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
        ),
    },
];

export default function Sidebar(): JSX.Element {
    const location = useLocation();

    return (
        <div className="w-64 h-full bg-slate-900 text-white flex flex-col">
            <div className="px-6 py-5 border-b border-slate-700">
                <h2 className="text-lg font-bold text-white tracking-tight">Finance Tracker</h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage your money</p>
            </div>

            <nav className="flex-1 p-3 space-y-1">
                {navItems.map(({ to, label, icon }) => {
                    const isActive = location.pathname.startsWith(to);
                    return (
                        <Link
                            key={to}
                            to={to}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${isActive
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            {icon}
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
