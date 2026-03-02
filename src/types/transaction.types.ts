import type { Account } from "./finance.types";

export type TransactionType = | "INCOME" | "EXPENSE" | "TRANSFER";

export interface BaseFinancialTransaction {
    type: TransactionType,
    amount: number,
    transactionDate: string,
    description?: string,
    fromAccount: Account,
    toAccount: Account,
    categoryId: number
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