import type { Category } from "./finance.types";

export interface CategoryProps {
    element: Category;
    loadCategories: (pageNumber: number, pageSize: number) => Promise<void>;
}

export interface EditCategoryProps {
    currentCategory: Category;
    handleUpdate: (updatedCategory: Category) => Promise<void>;
    handleCancel: () => void;
}
