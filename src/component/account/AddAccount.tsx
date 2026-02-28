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
    const handleChangeInNewAccount = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;

        let updatedValue: string | number | boolean;

        if (type === "checkbox") {
            updatedValue = (e.target as HTMLInputElement).checked;
        }
        else if (type === "number") {
            updatedValue = Number(value);
        }
        else {
            updatedValue = value
        }

        setNewAccount({
            ...newAccount,
            // [e.target.name]: e.target.value
            [name]: updatedValue
        });
    }
    const addNewAccount = async () => {
        console.log(newAccount);
        const response = await createAccount(newAccount);
        await loadAccounts(0, 10);
        console.log(response);
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-100">

            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Add New Account
            </h2>

            <div className="space-y-5">

                {/* Name */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={newAccount.name}
                        onChange={handleChangeInNewAccount}
                        className="border border-gray-300 rounded-lg px-3 py-2 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 transition"
                    />
                </div>

                {/* Type */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Type
                    </label>
                    <select
                        name="type"
                        value={newAccount.type}
                        onChange={handleChangeInNewAccount}
                        className="border border-gray-300 rounded-lg px-3 py-2 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 transition bg-white"
                    >
                        <option value="">Select Type</option>
                        {Object.values(ACCOUNT_TYPES).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Opening Balance */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Opening Balance
                    </label>
                    <input
                        type="number"
                        name="openingBalance"
                        value={newAccount.openingBalance}
                        onChange={handleChangeInNewAccount}
                        className="border border-gray-300 rounded-lg px-3 py-2 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 transition"
                    />
                </div>

                {/* Checkbox */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="active"
                        name="active"
                        checked={newAccount.active}
                        onChange={handleChangeInNewAccount}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded 
                   focus:ring-blue-500"
                    />
                    <label htmlFor="active" className="text-sm text-gray-700">
                        Enable Account
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    onClick={addNewAccount}
                    className="w-full bg-blue-600 text-white font-medium 
                 py-2.5 rounded-lg hover:bg-blue-700 
                 transition duration-200 shadow-md"
                >
                    Submit
                </button>

            </div>
        </div>
    )
}