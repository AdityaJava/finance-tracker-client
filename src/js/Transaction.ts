import api from "../interceptor/AuthenticationInterceptor";
import type { Page } from "../types/page.types";
import type { CreateTransactionPayload, FinancialTransaction } from "../types/transaction.types";
import { TRANSACTION_ENDPOINTS } from "./apiConstants";

export async function getAllTransactions(pageNumber: number, size: number): Promise<Page<FinancialTransaction>> {
    const response = await api.get(TRANSACTION_ENDPOINTS.BASE, {
        params: {
            page: pageNumber,
            size: size
        }
    });
    return response.data;
}

export async function createTransaction(payload: CreateTransactionPayload): Promise<void> {
    await api.post(TRANSACTION_ENDPOINTS.BASE, payload);
}
