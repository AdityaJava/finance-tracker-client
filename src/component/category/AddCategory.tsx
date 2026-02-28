import { useState, type JSX } from "react";
import type { Category } from "../../types/finance.types";
import { createCategory } from "../../js/Category";

type LoadCategoryProps = {
    loadCategories: (pageNumber: number, pageSize: number) => Promise<void>;
};

export default function AddCategory({ loadCategories }: LoadCategoryProps): JSX.Element {
    const [newCategory, setNewCategory] = useState<Category>({
        name: ""
    });

    const handleChangeInNewCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCategory({
            ...newCategory,
            [name]: value
        });
    };

    const addNewCategory = async () => {
        console.log(newCategory);
        const response = await createCategory(newCategory);
        setNewCategory({ name: "" });
        await loadCategories(0, 10);
        console.log(response);
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Add New Category</h2>

            <div className="space-y-5">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={newCategory.name}
                        onChange={handleChangeInNewCategory}
                        className="border border-gray-300 rounded-lg px-3 py-2 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 transition"
                    />
                </div>

                <button
                    type="submit"
                    onClick={addNewCategory}
                    className="w-full bg-blue-600 text-white font-medium 
                 py-2.5 rounded-lg hover:bg-blue-700 
                 transition duration-200 shadow-md"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
