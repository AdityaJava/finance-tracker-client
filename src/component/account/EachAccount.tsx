import { useState } from "react";
import { deleteAccountById, updateAccount } from "../../js/Account";
import type { Account } from "../../types/finance.types";
import type { AccountProps } from "../../types/account.types";
import { EditAccount } from "./EditAccount";

const accountTypeStyles: Record<string, string> = {
    CASH: "bg-emerald-100 text-emerald-700",
    BANK: "bg-blue-100 text-blue-700",
    FD: "bg-amber-100 text-amber-700",
    RECEIVABLE: "bg-purple-100 text-purple-700",
};

export default function EachAccount({ element, loadAccounts }: AccountProps) {
    const [editMode, setEditMode] = useState<boolean>(false);

    const deleteAccount = async (elementId: number) => {
        await deleteAccountById(elementId);
        loadAccounts(0, 10);
    };

    const handleUpdate = async (updatedAccount: Account) => {
        await updateAccount(updatedAccount);
        setEditMode(false);
        loadAccounts(0, 10);
    };

    if (editMode) {
        return <EditAccount currentAccount={element} handleUpdate={handleUpdate} handleCancel={() => setEditMode(false)} />;
    }

    const typeStyle = accountTypeStyles[element.type] ?? "bg-gray-100 text-gray-700";

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col gap-4">

            {/* Top row: name + type badge */}
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-slate-800 leading-tight">{element.name}</h3>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${typeStyle}`}>
                    {element.type}
                </span>
            </div>

            {/* Balance */}
            <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-0.5">Opening Balance</p>
                <p className="text-xl font-bold text-slate-800">₹{element.openingBalance.toLocaleString("en-IN")}</p>
            </div>

            {/* Bottom row: status + actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${element.active ? "text-emerald-600" : "text-red-500"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${element.active ? "bg-emerald-500" : "bg-red-400"}`}></span>
                    {element.active ? "Active" : "Inactive"}
                </span>

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setEditMode(true)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        title="Edit"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => deleteAccount(element.id!)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
