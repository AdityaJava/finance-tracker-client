import { useEffect, useState, type JSX } from "react";
import { type Account } from "../../types/finance.types";
import type { Page } from "../../types/page.types";
import { fetchAccounts } from "../../js/Account";
import AddAccount from "./AddAccount";
import EachAccount from "./EachAccount";
import Pagination from "../common/Pagination";

export default function AccountList(): JSX.Element {
    const initialAccountPageState: Page<Account> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 10
    };

    const [accountPage, setAccountPage] = useState<Page<Account>>(initialAccountPageState);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    useEffect(() => {
        loadAccounts(0, 10);
    }, []);

    const loadAccounts = async (pageNumber: number, pageSize: number): Promise<void> => {
        setLoading(true);
        const page = await fetchAccounts(pageNumber, pageSize);
        setAccountPage(page);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Accounts</h1>
                        {!loading && (
                            <p className="text-sm text-slate-500 mt-0.5">
                                {accountPage.totalElements} account{accountPage.totalElements !== 1 ? "s" : ""}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => setShowAddForm(v => !v)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Account
                    </button>
                </div>

                {/* Add Account Form */}
                {showAddForm && (
                    <div className="mb-6">
                        <AddAccount loadAccounts={(p, s) => { loadAccounts(p, s); setShowAddForm(false); }} />
                    </div>
                )}

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    </div>
                ) : accountPage.content.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <p className="text-gray-500 font-medium">No accounts yet</p>
                        <p className="text-sm text-gray-400 mt-1">Click "Add Account" to create one</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {accountPage.content.map((element) => (
                                <EachAccount key={element.id} loadAccounts={loadAccounts} element={element} />
                            ))}
                        </div>
                        <Pagination
                            currentPage={accountPage.number}
                            totalPages={accountPage.totalPages}
                            totalElements={accountPage.totalElements}
                            pageSize={accountPage.size}
                            onPageChange={(page) => loadAccounts(page, accountPage.size)}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
