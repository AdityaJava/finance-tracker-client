import { useState } from "react";
import type { Account, Category, Transaction } from "../types/finance.types";

export default function Dashboard() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Form states
    const [newAccount, setNewAccount] = useState({ name: "", type: "", balance: 0 });
    const [newCategory, setNewCategory] = useState({ name: "", type: "expense" as 'income' | 'expense' });
    const [newTransaction, setNewTransaction] = useState({
        amount: 0,
        categoryId: "",
        accountId: "",
        date: new Date().toISOString().split('T')[0],
        description: ""
    });

    const addAccount = () => {
        if (!newAccount.name || !newAccount.type) return;
        const account: Account = {
            id: Date.now().toString(),
            ...newAccount
        };
        setAccounts([...accounts, account]);
        setNewAccount({ name: "", type: "", balance: 0 });
    };

    const addCategory = () => {
        if (!newCategory.name) return;
        const category: Category = {
            id: Date.now().toString(),
            ...newCategory
        };
        setCategories([...categories, category]);
        setNewCategory({ name: "", type: "expense" });
    };

    const addTransaction = () => {
        if (!newTransaction.amount || !newTransaction.categoryId || !newTransaction.accountId) return;
        const transaction: Transaction = {
            id: Date.now().toString(),
            ...newTransaction
        };
        setTransactions([...transactions, transaction]);
        setNewTransaction({
            amount: 0,
            categoryId: "",
            accountId: "",
            date: new Date().toISOString().split('T')[0],
            description: ""
        });
    };

    // Insights calculations
    const totalIncome = transactions
        .filter(t => categories.find(c => c.id === t.categoryId)?.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => categories.find(c => c.id === t.categoryId)?.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const netBalance = totalIncome - totalExpense;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Finance Tracker Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Configuration Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Configuration</h2>

                    {/* Add Account */}
                    <div className="mb-4">
                        <h3 className="font-medium mb-2">Add Account</h3>
                        <input
                            type="text"
                            placeholder="Account Name"
                            value={newAccount.name}
                            onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Account Type"
                            value={newAccount.type}
                            onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="number"
                            placeholder="Initial Balance"
                            value={newAccount.balance}
                            onChange={(e) => setNewAccount({ ...newAccount, balance: parseFloat(e.target.value) || 0 })}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <button onClick={addAccount} className="w-full bg-blue-500 text-white p-2 rounded">Add Account</button>
                    </div>

                    {/* Add Category */}
                    <div>
                        <h3 className="font-medium mb-2">Add Category</h3>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <select
                            value={newCategory.type}
                            onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value as 'income' | 'expense' })}
                            className="w-full p-2 border rounded mb-2"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                        <button onClick={addCategory} className="w-full bg-green-500 text-white p-2 rounded">Add Category</button>
                    </div>
                </div>

                {/* Add Transactions */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) || 0 })}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <select
                        value={newTransaction.categoryId}
                        onChange={(e) => setNewTransaction({ ...newTransaction, categoryId: e.target.value })}
                        className="w-full p-2 border rounded mb-2"
                    >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <select
                        value={newTransaction.accountId}
                        onChange={(e) => setNewTransaction({ ...newTransaction, accountId: e.target.value })}
                        className="w-full p-2 border rounded mb-2"
                    >
                        <option value="">Select Account</option>
                        {accounts.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.name}</option>
                        ))}
                    </select>
                    <input
                        type="date"
                        value={newTransaction.date}
                        onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newTransaction.description}
                        onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <button onClick={addTransaction} className="w-full bg-purple-500 text-white p-2 rounded">Add Transaction</button>
                </div>

                {/* Insights */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Insights</h2>
                    <div className="space-y-2">
                        <p>Total Income: <span className="font-bold text-green-600">${totalIncome.toFixed(2)}</span></p>
                        <p>Total Expenses: <span className="font-bold text-red-600">${totalExpense.toFixed(2)}</span></p>
                        <p>Net Balance: <span className={`font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>${netBalance.toFixed(2)}</span></p>
                    </div>
                    <h3 className="font-medium mt-4 mb-2">Recent Transactions</h3>
                    <ul className="space-y-1">
                        {transactions.slice(-5).map(t => {
                            const category = categories.find(c => c.id === t.categoryId);
                            return (
                                <li key={t.id} className="text-sm">
                                    {t.description} - ${t.amount} ({category?.name})
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* Lists */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">Accounts</h3>
                    <ul>
                        {accounts.map(acc => (
                            <li key={acc.id}>{acc.name} - {acc.type} - ${acc.balance}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">Categories</h3>
                    <ul>
                        {categories.map(cat => (
                            <li key={cat.id}>{cat.name} ({cat.type})</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">Transactions</h3>
                    <ul>
                        {transactions.map(t => (
                            <li key={t.id}>{t.description} - ${t.amount}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}