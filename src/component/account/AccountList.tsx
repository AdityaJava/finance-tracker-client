import { useEffect, useState, type JSX, type ReactEventHandler } from "react";
import { ACCOUNT_TYPES, type Account } from "../../types/finance.types";
import type { Page } from "../../types/page.types";
import { createAccount, deleteAccountById, fetchAccounts } from "../../js/Account";
import deleteIcon from "../../assets/delete.png";
import AddAccount from "./AddAccount";

export default function AccountList(): JSX.Element {
    const intialAccountPageState: Page<Account> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 10
    };


    const [accontPage, setAccountPage] = useState<Page<Account>>(intialAccountPageState);
    const [loading, setLoading] = useState<boolean>(true);
    const [editingMap, setEditingMap] = useState<Record<number, boolean>>();

    useEffect(() => {
        loadAccounts(0, 10);
    }, []);

    const loadAccounts = async (pageNumber: number, pageSize: number): Promise<void> => {
        setLoading(true);
        const accountsPage = await fetchAccounts(pageNumber, pageSize);
        setAccountPage(accountsPage);
        setLoading(false);
    };

    const deleteAccount = async (elementId: number) => {
        console.log(elementId)
        await deleteAccountById(elementId);
        loadAccounts(0, 10)
    }

    const editing = (elementId: number) => {
        setEditingMap(prev => ({
            ...prev,
            [elementId]: true
        }));
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
                                    <h2 className="text-lg font-semibold text-gray-800" onClick={() => editing(element.id)}>
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
                                <div className="m-2 ml-0">
                                    <button onClick={() => deleteAccount(element.id)} className="p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                    >
                                        <img src={deleteIcon} className="w-5 h-5"
                                            alt="delete" />
                                    </button>
                                </div>
                            </div>
                        ))} <AddAccount loadAccounts={loadAccounts} />
                    </div>
                )}
            </div>
        </div >
    );
}