import { useState, type JSX } from "react";
import type { EditAccountProps } from "../../types/account.types";
import { ACCOUNT_TYPES, type Account } from "../../types/finance.types";

export function EditAccount({ currentAccount, handleUpdate, handleCancel }: EditAccountProps): JSX.Element {
    const [updatedAccount, setUpdatedAccount] = useState<Account>(currentAccount);

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
            updatedValue = value;
        }

        setUpdatedAccount({
            ...updatedAccount,
            [name]: updatedValue,
            id: currentAccount.id
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6 border border-gray-100">

            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800">
                    Edit Account
                </h2>
                <p className="text-sm text-gray-500">
                    Update your account details below
                </p>
            </div>

            {/* Name */}
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
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
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
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
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
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
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border">
                <label htmlFor="active" className="text-sm font-medium text-gray-700">
                    Enable Account
                </label>
                <input
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={updatedAccount.active}
                    onChange={handleChangeInNewAccount}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded 
                    focus:ring-blue-500"
                />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    onClick={() => handleUpdate(updatedAccount)}
                    className="flex-1 bg-blue-600 text-white font-medium 
                    py-2.5 rounded-lg hover:bg-blue-700 
                    transition duration-200 shadow-md"
                >
                    Update
                </button>

                <button
                    type="button"
                    onClick={() => handleCancel()}
                    className="flex-1 bg-gray-200 text-gray-700 font-medium 
                    py-2.5 rounded-lg hover:bg-gray-300 
                    transition duration-200"
                >
                    Cancel
                </button>
            </div>

        </div>
    );
}