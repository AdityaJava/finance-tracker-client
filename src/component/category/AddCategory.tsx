import { useState, type JSX } from "react";
import type { Category } from "../../types/finance.types";
import { createCategory } from "../../js/Category";

type LoadCategoryProps = {
    loadCategories: (pageNumber: number, pageSize: number) => Promise<void>;
};

export default function AddCategory({ loadCategories }: LoadCategoryProps): JSX.Element {
    const [newCategory, setNewCategory] = useState<Category>({ name: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    };

    const addNewCategory = async () => {
        await createCategory(newCategory);
        setNewCategory({ name: "" });
        await loadCategories(0, 10);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-sm">
            <h2 className="text-base font-semibold text-slate-800 mb-5">New Category</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={newCategory.name}
                        onChange={handleChange}
                        placeholder="e.g. Groceries"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                </div>

                <button
                    onClick={addNewCategory}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors shadow-sm"
                >
                    Create Category
                </button>
            </div>
        </div>
    );
}
