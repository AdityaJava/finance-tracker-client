import type { JSX } from "react";
import type { TransactionProps } from "../../types/transaction.types";

export default function EachTransaction({
    financialTransaction
}: TransactionProps): JSX.Element {

    const isCredit = financialTransaction.type === "TRANSFER";

    return (
        <tr className="hover:bg-gray-50 transition duration-150">

            <td className="px-4 py-3 text-sm text-gray-700">
                {financialTransaction.transactionDate}
            </td>

            <td className="px-4 py-3 text-sm text-gray-700">
                {financialTransaction.description}
            </td>

            <td className="px-4 py-3 text-sm text-gray-700">
                {financialTransaction.category
                    ? financialTransaction.category.name
                    : "No Category"}
            </td>

            <td
                className={`px-4 py-3 text-sm font-semibold ${isCredit ? "text-green-600" : "text-red-600"
                    }`}
            >
                ₹ {financialTransaction.amount}
            </td>

            <td className="px-4 py-3 text-sm text-gray-700">
                {financialTransaction.fromAccount
                    ? financialTransaction.fromAccount.name
                    : "-"}
            </td>

            <td className="px-4 py-3 text-sm text-gray-700">
                {financialTransaction.toAccount
                    ? financialTransaction.toAccount.name
                    : "-"}
            </td>

            <td className="px-4 py-3 text-sm">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${isCredit
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {financialTransaction.type}
                </span>
            </td>
        </tr>
    );
}