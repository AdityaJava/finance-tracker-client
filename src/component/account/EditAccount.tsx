import { useState, type JSX } from "react";
import type { EditAccountProps } from "../../types/account.types";
import { ACCOUNT_TYPES, type Account } from "../../types/finance.types";
import { updateAccount } from "../../js/Account";

export function EditAccount({ currentAccount, handleUpdate }: EditAccountProps): JSX.Element {
    const [updatedAccount, setUpdatedAccount] = useState<Account>(currentAccount);

    const handleChangeInNewAccount = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;

        let updatedValue: string | number | boolean;
        console.log(name);
        if (type === "checkbox") {
            updatedValue = (e.target as HTMLInputElement).checked;
        }
        else if (type === "number") {
            updatedValue = Number(value);
        }
        else {
            updatedValue = value
        }
        setUpdatedAccount({
            ...updatedAccount,
            // [e.target.name]: e.target.value
            [name]: updatedValue,
            id: currentAccount.id
        });

    }

    return (
        <div>
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={updatedAccount.name}
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
                    value={updatedAccount.type}
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
                    value={updatedAccount.openingBalance}
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
                    checked={updatedAccount.active}
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
                onClick={() => handleUpdate(updatedAccount)}
                className="w-full bg-blue-600 text-white font-medium 
                 py-2.5 rounded-lg hover:bg-blue-700 
                 transition duration-200 shadow-md"
            >
                Update
            </button>
        </div>
    )
}