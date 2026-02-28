import { useEffect, useState, type JSX, type ReactEventHandler } from "react";
import { ACCOUNT_TYPES, type Account } from "../../types/finance.types";
import type { Page } from "../../types/page.types";
import { createAccount, deleteAccountById, fetchAccounts } from "../../js/Account";
import AddAccount from "./AddAccount";
import EachAccount from "./EachAccount";

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

    useEffect(() => {
        loadAccounts(0, 10);
    }, []);

    const loadAccounts = async (pageNumber: number, pageSize: number): Promise<void> => {
        setLoading(true);
        const accountsPage = await fetchAccounts(pageNumber, pageSize);
        setAccountPage(accountsPage);
        setLoading(false);
    };


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
                            <EachAccount loadAccounts={loadAccounts} element={element} />
                        ))} <AddAccount loadAccounts={loadAccounts} />
                    </div>
                )}
            </div>
        </div >
    );
}