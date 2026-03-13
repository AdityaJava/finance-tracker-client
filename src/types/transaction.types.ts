import type { Account, Category } from "./finance.types";

export const TRANSACTION_TYPES = ["INCOME", "EXPENSE", "TRANSFER"];
export type TransactionType = typeof TRANSACTION_TYPES[number];

export interface BaseFinancialTransaction {
    type: TransactionType,
    amount: number,
    transactionDate: string,
    description?: string,
    fromAccount: Account | null,
    toAccount?: Account | null,
    category: Category | null
}

export interface FinancialTransaction extends BaseFinancialTransaction {
    id: number;
}

export type CreateFinancialTransactionRequest = BaseFinancialTransaction;

export type UpdateFinancialTransactionRequest =
    FinancialTransaction;


export interface TransactionProps {
    financialTransaction: FinancialTransaction;
}

// Interface is primarily used to define object shapes and supports declaration merging.
//Type is more powerful and can define unions, intersections, primitives,
//and utility types. In industry, we use interface for models and type for unions and transformations.