import { useEffect, useState, type JSX } from "react";
import type { Category } from "../../types/finance.types";
import type { Page } from "../../types/page.types";
import { deleteCategoryById, fetchCategories } from "../../js/Category";
import AddCategory from "./AddCategory";
import EachCategory from "./EachCategory";
import Pagination from "../common/Pagination";

export default function CategoryList(): JSX.Element {
    const initialCategoryPageState: Page<Category> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        size: 10
    };

    const [categoryPage, setCategoryPage] = useState<Page<Category>>(initialCategoryPageState);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    useEffect(() => {
        loadCategories(0, 10);
    }, []);

    const loadCategories = async (pageNumber: number, pageSize: number): Promise<void> => {
        setLoading(true);
        const page = await fetchCategories(pageNumber, pageSize);
        setCategoryPage(page);
        setLoading(false);
    };

    const deleteCategory = async (elementId: number) => {
        await deleteCategoryById(elementId);
        loadCategories(categoryPage.number, categoryPage.size);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Categories</h1>
                        {!loading && (
                            <p className="text-sm text-slate-500 mt-0.5">
                                {categoryPage.totalElements} categor{categoryPage.totalElements !== 1 ? "ies" : "y"}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => setShowAddForm(v => !v)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Category
                    </button>
                </div>

                {/* Add Category Form */}
                {showAddForm && (
                    <div className="mb-6">
                        <AddCategory loadCategories={(p, s) => { loadCategories(p, s); setShowAddForm(false); }} />
                    </div>
                )}

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    </div>
                ) : categoryPage.content.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <p className="text-gray-500 font-medium">No categories yet</p>
                        <p className="text-sm text-gray-400 mt-1">Click "Add Category" to create one</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {categoryPage.content.map((element) => (
                                <EachCategory key={element.id} element={element} loadCategories={loadCategories} deleteCategory={deleteCategory} />
                            ))}
                        </div>
                        <Pagination
                            currentPage={categoryPage.number}
                            totalPages={categoryPage.totalPages}
                            totalElements={categoryPage.totalElements}
                            pageSize={categoryPage.size}
                            onPageChange={(page) => loadCategories(page, categoryPage.size)}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
