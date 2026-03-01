import { useState } from "react";
import { deleteAccountById, updateAccount } from "../../js/Account";
import type { Account } from "../../types/finance.types";
import type { AccountProps } from "../../types/account.types";
import deleteIcon from "../../assets/delete.png";
import { EditAccount } from "./EditAccount";

export default function EachAccount({ element, loadAccounts }: AccountProps) {

    const deleteAccount = async (elementId: number) => {
        console.log(elementId)
        await deleteAccountById(elementId);
        loadAccounts(0, 10)
    }
    const [editMode, setEditMode] = useState<boolean>(false);

    const editing = () => {
        setEditMode(true);
    }

    const handleUpdate = async (updatedAccount: Account) => {
        await updateAccount(updatedAccount);
        setEditMode(false);
        loadAccounts(0, 10);
    }

    return (
        (!editMode ?
            <div
                key={element.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-100"
                onClick={() => editing()}>
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-gray-800" >
                        {element.name}
                    </h2>
                    <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${element.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                            }`}
                    >
                        {element.active ? "Active" : "Inactive"}
                    </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                    <p>
                        <span className="font-medium text-gray-700">
                            Type:
                        </span>{" "}
                        {element.type}
                    </p>
                    <p>
                        <span className="font-medium text-gray-700">
                            Opening Balance:
                        </span>{" "}
                        ₹{element.openingBalance}
                    </p>
                </div>
                <div className="m-2 ml-0">
                    <button onClick={() => deleteAccount(element.id)} className="p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                    >
                        <img src={deleteIcon} className="w-5 h-5"
                            alt="delete" />
                    </button>
                </div>
            </div> : <EditAccount currentAccount={element} handleUpdate={handleUpdate} />)
    )
}