import { useEffect, useState, type JSX, type ReactEventHandler } from "react";
import { ACCOUNT_TYPES, type Account } from "../../types/finance.types";
import type { Page } from "../../types/page.types";
import { createAccount, fetchAccounts } from "../../js/Account";

export default function AccountList(): JSX.Element {
    const intialAccountPageState: Page<Account> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 10
    };

    const [newAccount, setNewAccount] = useState<Account>({
        name: "",
        type: "",
        openingBalance: 0,
        active: false
    });

    const [accontPage, setAccountPage] = useState<Page<Account>>(intialAccountPageState);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadAccounts(0, 10);
    }, []);

    const loadAccounts = async (pageNumber: number, pageSize: number): Promise<void> => {
        setLoading(true);
        const accountsPage = await fetchAccounts(pageNumber, pageSize);
        setAccountPage(accountsPage);
        setLoading(false);
    };
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
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    Accounts
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    </div>
                ) : accontPage.content.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        No accounts found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {accontPage.content.map((element) => (
                            <div
                                key={element.id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-100"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {element.name}
                                    </h2>
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full font-medium ${element.active
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {element.active ? "Active" : "Inactive"}
                                    </span>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <p>
                                        <span className="font-medium text-gray-700">
                                            Type:
                                        </span>{" "}
                                        {element.type}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-700">
                                            Opening Balance:
                                        </span>{" "}
                                        ₹{element.openingBalance}
                                    </p>
                                </div>
                            </div>
                        ))}
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
                    </div>
                )}
            </div>
        </div >
    );
}