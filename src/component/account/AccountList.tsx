import { useEffect, useState, type JSX } from "react";
import type { Account } from "../../types/finance.types";
import type { Page } from "../../types/page.types";
import { fetchAccounts } from "../../js/Account";

export default function AccountList(): JSX.Element {
    const intialAccountPageState: Page<Account> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 10
    };
    const [accontPage, setAccountPage] = useState<Page<Account>>(intialAccountPageState);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

    });

    const loadAccounts = async (pageNumber: number, pageSize: number): Promise<void> => {
        setLoading(true);
        const accountsPage = await fetchAccounts(pageNumber, pageSize);
        setAccountPage(accountsPage);
        setLoading(false);
    };

    return (
        <div>

        </div>
    )
}