import { useEffect, useState, type JSX } from "react";
import { TRANSACTION_TYPES, type BaseFinancialTransaction } from "../../types/transaction.types";
import type { Page } from "../../types/page.types";
import { type Account, type Category } from "../../types/finance.types";
import { fetchCategories } from "../../js/Category";
import Select from "react-select";
import { fetchAccounts } from "../../js/Account";
import { useAsyncError } from "react-router-dom";

export function AddTransaction(): JSX.Element {
    const [cashAccount, setCashAccount] = useState<Account>();

    const initialNewTransactionState: BaseFinancialTransaction = {
        type: "EXPENSE",
        amount: 0,
        transactionDate: "",
        description: "",
        fromAccount: null,
        toAccount: null,
        category: null
    }

    const [newTransaction, setNewTrasaction] = useState<BaseFinancialTransaction>(initialNewTransactionState);

    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);

    const initialCategoryPageState: Page<Category> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 10
    };
    const [categoryPage, setCategoryPage] = useState<Page<Category>>(initialCategoryPageState);

    const loadCashAccount = async () => {
        const accountPage = await fetchAccounts(0, 1, "CASH");
        setCashAccount(accountPage.content[0]);
    }

    const loadCategories = async (pageNumber: number, pageSize: number): Promise<void> => {
        setCategoriesLoading(true);
        const categoriesPage = await fetchCategories(pageNumber, pageSize);
        setCategoryPage(categoriesPage);
        setCategoriesLoading(false);
    };

    useEffect(() => {
        loadCashAccount();
    }, [])

    useEffect(() => {
        if (cashAccount) {
            setNewTrasaction(prev => ({
                ...prev, fromAccount: cashAccount
            }));
        }
    }, [cashAccount]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;
        if (name === 'transactionType') {
            console.log('Trrr');
        }
    }
    const loadMoreCategories = () => {

    }

    return (
        <div>
            <div><input type="date"></input></div>
            <div><input type="text"></input></div>
            <div>
                <select name="transactionType" value={newTransaction?.type} onChange={handleChange}>
                    <option value="">Select Type</option>
                    {TRANSACTION_TYPES.map(type => {
                        return (<option key={type} value={type}>
                            {type}
                        </option>)
                    })}
                </select>
            </div>
            <div>
                <select name="transactionType" value={newTransaction?.type} onChange={handleChange} onScroll={loadMoreCategories}>
                    <option value="">Select Categories</option>
                    {categoryPage.content.map(type => {
                        return (<option key={type.id} value={type.name}>
                            {type.name}
                        </option>)
                    })}
                </select>
            </div>

        </div>
    )
}