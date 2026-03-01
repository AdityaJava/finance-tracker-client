import { useState } from "react";
import { deleteCategoryById, updateCategory } from "../../js/Category";
import type { Category } from "../../types/finance.types";
import type { CategoryProps } from "../../types/category.types";
import deleteIcon from "../../assets/delete.png";
import EditCategory from "./EditCategory";

export default function EachCategory({ element, loadCategories }: CategoryProps) {
    const [editMode, setEditMode] = useState<boolean>(false);

    const deleteCategory = async (elementId: number) => {
        console.log(elementId);
        await deleteCategoryById(elementId);
        loadCategories(0, 10);
    };

    const editing = () => {
        setEditMode(true);
    };

    const handleUpdate = async (updatedCategory: Category) => {
        await updateCategory(updatedCategory);
        setEditMode(false);
        loadCategories(0, 10);
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    return (
        !editMode ? (
            <div
                key={element.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-100"
                onClick={() => editing()}
            >
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-gray-800">{element.name}</h2>
                </div>

                <div className="m-2 ml-0">
                    <button
                        onClick={(e) => { e.stopPropagation(); deleteCategory(element.id!); }}
                        className="p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                    >
                        <img src={deleteIcon} className="w-5 h-5" alt="delete" />
                    </button>
                </div>
            </div>
        ) : (
            <EditCategory currentCategory={element} handleUpdate={handleUpdate} handleCancel={handleCancel} />
        )
    );
}
