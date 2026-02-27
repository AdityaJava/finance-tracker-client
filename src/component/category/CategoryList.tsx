import { useEffect, useState, type JSX } from "react";
import type { Category } from "../../types/finance.types";
import type { Page } from "../../types/page.types";
import { createCategory, deleteCategoryById, fetchCategories } from "../../js/Category";
import deleteIcon from "../../assets/delete.png";

export default function CategoryList(): JSX.Element {
    const initialCategoryPageState: Page<Category> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 10
    };

    const [newCategory, setNewCategory] = useState<Category>({
        name: ""
    });

    const [categoryPage, setCategoryPage] = useState<Page<Category>>(initialCategoryPageState);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadCategories(0, 10);
    }, []);

    const loadCategories = async (pageNumber: number, pageSize: number): Promise<void> => {
        setLoading(true);
        const categoriesPage = await fetchCategories(pageNumber, pageSize);
        setCategoryPage(categoriesPage);
        setLoading(false);
    };

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

    const deleteCategory = async (elementId: number) => {
        console.log(elementId);
        await deleteCategoryById(elementId);
        loadCategories(0, 10);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    Categories
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    </div>
                ) : categoryPage.content.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        No categories found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryPage.content.map((element) => (
                            <div
                                key={element.id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-100"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {element.name}
                                    </h2>
                                </div>
                                <div className="m-2 ml-0">
                                    <button
                                        onClick={() => deleteCategory(element.id!)}
                                        className="p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                    >
                                        <img src={deleteIcon} className="w-5 h-5" alt="delete" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                Add New Category
                            </h2>

                            <div className="space-y-5">
                                {/* Name */}
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
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

                                {/* Submit Button */}
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
                    </div>
                )}
            </div>
        </div>
    );
}
