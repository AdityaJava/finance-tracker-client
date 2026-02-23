import { useState, type JSX } from "react";
import type { Account } from "../../types/finance.types";
import type { Page } from "../../types/page.types";

export default function AccountList(): JSX.Element {
    const intialAccountPageState: Page<Account> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 10
    };
    const [accontPage, setAccountPage] = useState<Page<Account>>(intialAccountPageState);
    return (
        <div>

        </div>
    )
}