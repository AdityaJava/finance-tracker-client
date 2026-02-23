export interface Account {
    id: string;
    name: string;
    type: string;
    balance: number;
}

export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
}

export interface Transaction {
    id: string;
    amount: number;
    categoryId: string;
    accountId: string;
    date: string;
    description: string;
}