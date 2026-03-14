import { useEffect, useState, type JSX } from "react";
import type { FinancialTransaction } from "../../types/transaction.types";
import type { Page } from "../../types/page.types";
import EachTransaction from "./EachTransaction";
import { getAllTransactions } from "../../js/Transaction";

export function TransactionList(): JSX.Element {
    const initialTransactionPageState: Page<FinancialTransaction> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 10
    };

    const [transactionPage, setTransactionPage] =
        useState<Page<FinancialTransaction>>(initialTransactionPageState);

    const getTransactionPage = async (): Promise<void> => {
        const response = await getAllTransactions(0, 10);
        setTransactionPage(response);
    };

    useEffect(() => {
        getTransactionPage();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-6">

                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Transactions
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">From</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">To</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {transactionPage.content.map((transaction) => (
                                <EachTransaction
                                    key={transaction.id}
                                    financialTransaction={transaction}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                    Total Transactions: {transactionPage.totalElements}
                </div>
            </div>
        </div>
    );
}