import { useState, type JSX } from "react";
import type { EditCategoryProps } from "../../types/category.types";
import type { Category } from "../../types/finance.types";

export default function EditCategory({ currentCategory, handleUpdate, handleCancel }: EditCategoryProps): JSX.Element {
    const [updatedCategory, setUpdatedCategory] = useState<Category>(currentCategory);

    const handleChangeInCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedCategory({
            ...updatedCategory,
            [name]: value,
            id: currentCategory.id
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6 border border-gray-100">
            <div>
                <h2 className="text-xl font-semibold text-gray-800">Edit Category</h2>
                <p className="text-sm text-gray-500">Update your category name below</p>
            </div>

            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={updatedCategory.name}
                    onChange={handleChangeInCategory}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    onClick={() => handleUpdate(updatedCategory)}
                    className="flex-1 bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
                >
                    Update
                </button>

                <button
                    type="button"
                    onClick={() => handleCancel()}
                    className="flex-1 bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-300 transition duration-200"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
