import axios from "axios";
import { ACCOUNT_ENDPOINTS } from "./apiConstants";
import type { Account } from "../types/finance.types";
import type { Page } from "../types/page.types";
import api from "../interceptor/AuthenticationInterceptor";

export async function fetchAccounts(pageNumber: number, pageSize: number): Promise<Page<Account>> {
    const response = await api.get(ACCOUNT_ENDPOINTS.ACCOUNTS_PAGE, {
        params: {
            page: pageNumber,
            size: pageSize
        }
    });
    return response.data;
}

export async function createAccount(account: Account) {
    const response = await api.post(ACCOUNT_ENDPOINTS.CREATE_ACCOUNT, account)
    return response.data;
}