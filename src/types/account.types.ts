import type { Account } from "./finance.types";

export interface AccountProps {
    element: Account,
    loadAccounts: (pageNumber: number, pageSize: number) => Promise<void>
}

export interface EditAccountProps {
    currentAccount: Account,
    handleUpdate: (updatedAccount: Account) => Promise<void>
    handleCancel: () => void
}