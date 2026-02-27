import axios from "axios";
import { CATEGORY_ENDPOINTS } from "./apiConstants";
import type { Category } from "../types/finance.types";
import type { Page } from "../types/page.types";
import api from "../interceptor/AuthenticationInterceptor";

export async function fetchCategories(pageNumber: number, pageSize: number): Promise<Page<Category>> {
    const response = await api.get(CATEGORY_ENDPOINTS.CATEGORIES_PAGE, {
        params: {
            page: pageNumber,
            size: pageSize
        }
    });
    return response.data;
}

export async function createCategory(category: Category) {
    const response = await api.post(CATEGORY_ENDPOINTS.CREATE_CATEGORY, category)
    return response.data;
}

export async function deleteCategoryById(categoryId: number) {
    const response = await api.delete(CATEGORY_ENDPOINTS.BASE + '/' + categoryId)
    return response.data;
}
