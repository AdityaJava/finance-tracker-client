import { useEffect, useRef, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { TRANSACTION_TYPES, type TransactionType } from "../../types/transaction.types";
import type { Account, Category } from "../../types/finance.types";
import type { Page } from "../../types/page.types";
import { fetchAccounts } from "../../js/Account";
import { fetchCategories } from "../../js/Category";
import { createTransaction } from "../../js/Transaction";

interface FormState {
    type: TransactionType;
    amount: string;
    transactionDate: string;
    description: string;
    fromAccountId: number | null;
    toAccountId: number | null;
    categoryId: number | null;
}

const TYPE_STYLES: Record<TransactionType, string> = {
    INCOME: "bg-emerald-600 text-white border-emerald-600",
    EXPENSE: "bg-red-500 text-white border-red-500",
    TRANSFER: "bg-blue-600 text-white border-blue-600",
};

const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

export function AddTransaction(): JSX.Element {
    const navigate = useNavigate();
    const categoriesLoadingRef = useRef(false);

    const [form, setForm] = useState<FormState>({
        type: "EXPENSE",
        amount: "",
        transactionDate: new Date().toISOString().split("T")[0],
        description: "",
        fromAccountId: null,
        toAccountId: null,
        categoryId: null,
    });

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [categoryPage, setCategoryPage] = useState<Page<Category>>({
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 20,
    });
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const loadAccounts = async () => {
        const page = await fetchAccounts(0, 100);
        setAccounts(page.content);
    };

    const loadCategories = async (pageNumber: number) => {
        if (categoriesLoadingRef.current) return;
        categoriesLoadingRef.current = true;
        const page = await fetchCategories(pageNumber, 20);
        setCategoryPage(prev => ({
            ...page,
            content: pageNumber === 0 ? page.content : [...prev.content, ...page.content],
        }));
        categoriesLoadingRef.current = false;
    };

    useEffect(() => {
        loadAccounts();
        loadCategories(0);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setError(null);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeChange = (type: TransactionType) => {
        setError(null);
        setForm(prev => ({ ...prev, type, fromAccountId: null, toAccountId: null, categoryId: null }));
    };

    const handleSubmit = async () => {
        setError(null);

        if (!form.amount || Number(form.amount) <= 0) {
            setError("Amount must be greater than 0.");
            return;
        }
        if (!form.transactionDate) {
            setError("Transaction date is required.");
            return;
        }
        if (form.type === "EXPENSE" && (!form.fromAccountId || !form.categoryId)) {
            setError("Expense requires a from account and category.");
            return;
        }
        if (form.type === "INCOME" && (!form.toAccountId || !form.categoryId)) {
            setError("Income requires a to account and category.");
            return;
        }
        if (form.type === "TRANSFER" && (!form.fromAccountId || !form.toAccountId)) {
            setError("Transfer requires both from and to accounts.");
            return;
        }
        if (form.type === "TRANSFER" && form.fromAccountId === form.toAccountId) {
            setError("From and to account cannot be the same.");
            return;
        }

        setSubmitting(true);
        try {
            await createTransaction({
                type: form.type,
                amount: Number(form.amount),
                transactionDate: form.transactionDate,
                description: form.description || undefined,
                fromAccount: form.fromAccountId ? { id: form.fromAccountId } : null,
                toAccount: form.toAccountId ? { id: form.toAccountId } : null,
                category: form.categoryId ? { id: form.categoryId } : null,
            });
            navigate("/transactions");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const data = err.response?.data;
                const msg = typeof data?.message === "string" && data.message.trim()
                    ? data.message
                    : `Request failed (${err.response?.status ?? "unknown"}).`;
                setError(msg);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    const accountOptions = accounts.map(a => ({ value: a.id!, label: `${a.name} (${a.type})` }));
    const categoryOptions = categoryPage.content.map(c => ({ value: c.id!, label: c.name }));

    const showFromAccount = form.type === "EXPENSE" || form.type === "TRANSFER";
    const showToAccount = form.type === "INCOME" || form.type === "TRANSFER";
    const showCategory = form.type === "EXPENSE" || form.type === "INCOME";

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-lg mx-auto">

                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => navigate("/transactions")}
                        className="text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold text-slate-800">New Transaction</h1>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
                        <div className="flex gap-2">
                            {TRANSACTION_TYPES.map(t => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => handleTypeChange(t)}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                                        form.type === t
                                            ? TYPE_STYLES[t]
                                            : "border-gray-200 text-slate-600 hover:bg-slate-50"
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">₹</span>
                            <input
                                type="number"
                                name="amount"
                                value={form.amount}
                                onChange={handleChange}
                                placeholder="0.00"
                                min="0"
                                className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
                        <input
                            type="date"
                            name="transactionDate"
                            value={form.transactionDate}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    {/* From Account */}
                    {showFromAccount && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">From Account</label>
                            <Select
                                options={accountOptions}
                                value={accountOptions.find(o => o.value === form.fromAccountId) ?? null}
                                onChange={opt => { setError(null); setForm(prev => ({ ...prev, fromAccountId: opt?.value ?? null })); }}
                                placeholder="Select account..."
                                isClearable
                            />
                        </div>
                    )}

                    {/* To Account */}
                    {showToAccount && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">To Account</label>
                            <Select
                                options={accountOptions}
                                value={accountOptions.find(o => o.value === form.toAccountId) ?? null}
                                onChange={opt => { setError(null); setForm(prev => ({ ...prev, toAccountId: opt?.value ?? null })); }}
                                placeholder="Select account..."
                                isClearable
                            />
                        </div>
                    )}

                    {/* Category */}
                    {showCategory && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                            <Select
                                options={categoryOptions}
                                value={categoryOptions.find(o => o.value === form.categoryId) ?? null}
                                onChange={opt => { setError(null); setForm(prev => ({ ...prev, categoryId: opt?.value ?? null })); }}
                                onMenuScrollToBottom={() => {
                                    if (categoryPage.number + 1 < categoryPage.totalPages) {
                                        loadCategories(categoryPage.number + 1);
                                    }
                                }}
                                placeholder="Select category..."
                                isClearable
                            />
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Description <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="e.g. Grocery shopping"
                            className={inputClass}
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition-colors shadow-sm"
                    >
                        {submitting ? "Saving..." : "Save Transaction"}
                    </button>
                </div>
            </div>
        </div>
    );
}
