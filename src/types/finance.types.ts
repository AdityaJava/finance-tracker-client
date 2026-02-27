export interface Account {
    name: string,
    type: string,
    openingBalance: number,
    active: boolean
}

export const ACCOUNT_TYPES = {
    CASH: "CASH",
    BANK: "BANK",
    FD: "FD",
    RECEIVABLE: "RECEIVABLE"
} as const;

