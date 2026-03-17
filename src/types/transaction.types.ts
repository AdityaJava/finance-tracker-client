import type { Account, Category } from "./finance.types";

export const TRANSACTION_TYPES = ["INCOME", "EXPENSE", "TRANSFER"] as const;
export type TransactionType = typeof TRANSACTION_TYPES[number];

export interface BaseFinancialTransaction {
    type: TransactionType;
    amount: number;
    transactionDate: string;
    description?: string;
    fromAccount: Account | null;
    toAccount?: Account | null;
    category: Category | null;
}

export interface FinancialTransaction extends BaseFinancialTransaction {
    id: number;
}

export interface CreateTransactionPayload {
    type: TransactionType;
    amount: number;
    transactionDate: string;
    description?: string;
    fromAccount?: { id: number } | null;
    toAccount?: { id: number } | null;
    category?: { id: number } | null;
}

export interface TransactionProps {
    financialTransaction: FinancialTransaction;
}
