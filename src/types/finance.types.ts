export interface Account {
    name: string,
    type: string,
    openingBalance: number,
    active: boolean
}

export interface Category {
    id?: number,
    name: string
}

export const ACCOUNT_TYPES = {
    CASH: "CASH",
    BANK: "BANK",
    FD: "FD",
    RECEIVABLE: "RECEIVABLE"
} as const;

