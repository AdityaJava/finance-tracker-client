import type { JSX } from "react";
import type { TransactionProps } from "../../types/transaction.types";

const typeConfig: Record<string, { badge: string; amount: string; prefix: string }> = {
    INCOME: {
        badge: "bg-emerald-100 text-emerald-700",
        amount: "text-emerald-600",
        prefix: "+ ₹",
    },
    EXPENSE: {
        badge: "bg-red-100 text-red-700",
        amount: "text-red-600",
        prefix: "- ₹",
    },
    TRANSFER: {
        badge: "bg-blue-100 text-blue-700",
        amount: "text-blue-600",
        prefix: "₹",
    },
};

export default function EachTransaction({ financialTransaction }: TransactionProps): JSX.Element {
    const config = typeConfig[financialTransaction.type] ?? typeConfig.EXPENSE;

    return (
        <tr className="hover:bg-slate-50 transition-colors duration-100">
            <td className="px-5 py-3.5 text-sm text-slate-600 whitespace-nowrap">
                {financialTransaction.transactionDate}
            </td>

            <td className="px-5 py-3.5 text-sm text-slate-800 max-w-[180px] truncate">
                {financialTransaction.description || <span className="text-slate-400 italic">No description</span>}
            </td>

            <td className="px-5 py-3.5 text-sm text-slate-600">
                {financialTransaction.category
                    ? financialTransaction.category.name
                    : <span className="text-slate-400">—</span>}
            </td>

            <td className={`px-5 py-3.5 text-sm font-semibold text-right whitespace-nowrap ${config.amount}`}>
                {config.prefix}{financialTransaction.amount.toLocaleString("en-IN")}
            </td>

            <td className="px-5 py-3.5 text-sm text-slate-600">
                {financialTransaction.fromAccount?.name ?? <span className="text-slate-400">—</span>}
            </td>

            <td className="px-5 py-3.5 text-sm text-slate-600">
                {financialTransaction.toAccount?.name ?? <span className="text-slate-400">—</span>}
            </td>

            <td className="px-5 py-3.5">
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${config.badge}`}>
                    {financialTransaction.type}
                </span>
            </td>
        </tr>
    );
}
