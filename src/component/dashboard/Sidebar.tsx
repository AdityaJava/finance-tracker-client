import type { JSX } from "react";
import { Link } from "react-router-dom";

export default function Sidebar(): JSX.Element {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-6">Finance Tracker</h2>
            <ul className="space-y-4">
                <li className="cursor-pointer hover:text-gray-300">
                    <Link to="/accounts" className="cursor-pointer hover:text-gray-300"
                    >
                        Accounts
                    </Link>
                </li>
                <li className="cursor-pointer hover:text-gray-300">Categories</li>
                <li className="cursor-pointer hover:text-gray-300">Transaction</li>
            </ul>
        </div>
    )
}