import { useEffect, useState, type JSX } from "react";
import type { Category } from "../../types/finance.types";
import type { Page } from "../../types/page.types";
import { deleteCategoryById, fetchCategories } from "../../js/Category";
import deleteIcon from "../../assets/delete.png";
import AddCategory from "./AddCategory";

export default function CategoryList(): JSX.Element {
    const initialCategoryPageState: Page<Category> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 10
    };

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



    const deleteCategory = async (elementId: number) => {
        console.log(elementId);
        await deleteCategoryById(elementId);
        loadCategories(0, 10);
    };
    const startEditing = () => {
        console.log("Editing");
    }
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
                                    <h2 className="text-lg font-semibold text-gray-800" onClick={startEditing}>
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
                        <AddCategory loadCategories={loadCategories} />
                    </div>
                )}
            </div>
        </div>
    );
}
