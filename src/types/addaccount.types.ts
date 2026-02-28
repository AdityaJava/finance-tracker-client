export interface LoadAccountProps {
    loadAccounts: (pageNumber: number, pageSize: number) => Promise<void>;
}
