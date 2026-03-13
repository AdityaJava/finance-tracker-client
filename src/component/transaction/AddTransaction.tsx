import { useState, type JSX } from "react";
import { type BaseFinancialTransaction } from "../../types/transaction.types";
import type { Page } from "../../types/page.types";
import type { Category } from "../../types/finance.types";
import { fetchCategories } from "../../js/Category";
import Select from "react-select";

export function AddTransaction(): JSX.Element {
    const initialNewTransactionState: BaseFinancialTransaction = {
        type: "EXPENSE",
        amount: 0,
        transactionDate: "",
        description: "",
        fromAccount: null,
        toAccount: null,
        category: null
    }
    const initialCategoryPageState: Page<Category> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 10
    };


    const [newTransaction, setNewTrasaction] = useState<BaseFinancialTransaction>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;
        if (name === 'transactionType') {
            console.log('Trrr');
        }
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
        </div>
    )
}