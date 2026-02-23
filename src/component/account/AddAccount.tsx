import { useState, type JSX } from "react";
import type { Account } from "../../types/finance.types";

export default function AddAccount(): JSX.Element {
    const initialAccountState: Account = {
        name: "",
        type: "",
        openingBalance: 0,
        isActive: true
    };

    const [account, setAccount] = useState<Account>(initialAccountState);

}