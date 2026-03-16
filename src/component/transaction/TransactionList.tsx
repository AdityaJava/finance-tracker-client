import { useEffect, useState, type JSX } from "react";
import type { FinancialTransaction } from "../../types/transaction.types";
import type { Page } from "../../types/page.types";
import EachTransaction from "./EachTransaction";
import { getAllTransactions } from "../../js/Transaction";
import Pagination from "../common/Pagination";

export function TransactionList(): JSX.Element {
    const initialTransactionPageState: Page<FinancialTransaction> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 10
    };

    const [transactionPage, setTransactionPage] = useState<Page<FinancialTransaction>>(initialTransactionPageState);
    const [loading, setLoading] = useState<boolean>(true);

    const loadTransactions = async (pageNumber: number, pageSize: number): Promise<void> => {
        setLoading(true);
        const response = await getAllTransactions(pageNumber, pageSize);
        setTransactionPage(response);
        setLoading(false);
    };

    useEffect(() => {
        loadTransactions(0, 10);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Transactions</h1>
                        {!loading && (
                            <p className="text-sm text-slate-500 mt-0.5">
                                {transactionPage.totalElements} transaction{transactionPage.totalElements !== 1 ? "s" : ""}
                            </p>
                        )}
                    </div>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Transaction
                    </button>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center items-center h-48">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : transactionPage.content.length === 0 ? (
                        <div className="text-center py-20">
                            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                            <p className="text-gray-500 font-medium">No transactions yet</p>
                            <p className="text-sm text-gray-400 mt-1">Add your first transaction to get started</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-gray-100">
                                            <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                                            <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</th>
                                            <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</th>
                                            <th className="px-5 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                                            <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">From</th>
                                            <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">To</th>
                                            <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {transactionPage.content.map((transaction) => (
                                            <EachTransaction key={transaction.id} financialTransaction={transaction} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="px-5 pb-4">
                                <Pagination
                                    currentPage={transactionPage.number}
                                    totalPages={transactionPage.totalPages}
                                    totalElements={transactionPage.totalElements}
                                    pageSize={transactionPage.size}
                                    onPageChange={(page) => loadTransactions(page, transactionPage.size)}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
