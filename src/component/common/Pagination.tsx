import type { JSX } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, totalElements, pageSize, onPageChange }: PaginationProps): JSX.Element {
    const from = totalElements === 0 ? 0 : currentPage * pageSize + 1;
    const to = Math.min((currentPage + 1) * pageSize, totalElements);

    return (
        <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
            <span>Showing {from}–{to} of {totalElements}</span>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    Previous
                </button>
                <span className="px-2">Page {currentPage + 1} of {totalPages}</span>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
