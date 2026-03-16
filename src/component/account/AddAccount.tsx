import { useState, type JSX } from "react";
import { ACCOUNT_TYPES, type Account } from "../../types/finance.types";
import { createAccount } from "../../js/Account";
import type { LoadAccountProps } from "../../types/addaccount.types";

export default function AddAccount({ loadAccounts }: LoadAccountProps): JSX.Element {
    const [newAccount, setNewAccount] = useState<Account>({
        name: "",
        type: "",
        openingBalance: 0,
        active: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;
        let updatedValue: string | number | boolean;
        if (type === "checkbox") {
            updatedValue = (e.target as HTMLInputElement).checked;
        } else if (type === "number") {
            updatedValue = Number(value);
        } else {
            updatedValue = value;
        }
        setNewAccount({ ...newAccount, [name]: updatedValue });
    };

    const addNewAccount = async () => {
        await createAccount(newAccount);
        await loadAccounts(0, 10);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-lg">
            <h2 className="text-base font-semibold text-slate-800 mb-5">New Account</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={newAccount.name}
                        onChange={handleChange}
                        placeholder="e.g. HDFC Savings"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
                    <select
                        name="type"
                        value={newAccount.type}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    >
                        <option value="">Select type</option>
                        {Object.values(ACCOUNT_TYPES).map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Opening Balance</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">₹</span>
                        <input
                            type="number"
                            name="openingBalance"
                            value={newAccount.openingBalance}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                    </div>
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        name="active"
                        checked={newAccount.active}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700">Mark as active</span>
                </label>

                <button
                    onClick={addNewAccount}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors shadow-sm"
                >
                    Create Account
                </button>
            </div>
        </div>
    );
}
