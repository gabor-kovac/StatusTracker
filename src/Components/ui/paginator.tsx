import { Pagination, PaginationLink, PaginationEllipsis, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import type {JSX} from "react";

type PaginatorProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
    showPreviousNext?: boolean;
}

export default function Paginator({
    currentPage,
    totalPages,
    onPageChange,
    showPreviousNext = true,
}: PaginatorProps) {

    const previousPage = () => {
        if(currentPage == 1) return;
        onPageChange(currentPage - 1);
    }

    const nextPage = () => {
        if(currentPage == totalPages) return;
        onPageChange(currentPage + 1);
    }

    return (
        <Pagination>
            <PaginationContent>
                {showPreviousNext && totalPages &&
                <PaginationItem>
                    <PaginationPrevious onClick={previousPage} className={currentPage === 1 ? "opacity-50" : ""} />
                </PaginationItem>
                }
                {generatePaginationLinks({currentPage, totalPages, onPageChange})}
                {showPreviousNext && totalPages &&
                <PaginationItem>
                    <PaginationNext onClick={nextPage} className={currentPage === totalPages ? "opacity-50" : ""} />
                </PaginationItem>
                }
            </PaginationContent>
        </Pagination>
    )
}

function generatePaginationLinks({currentPage, totalPages, onPageChange}: PaginatorProps) {
    const pages: JSX.Element[] = [];

    const renderLink = (num: number): JSX.Element => {
        return (
        <PaginationItem key={num}>
            <PaginationLink onClick={() => onPageChange(num)} isActive={num === currentPage}>
                {num}
            </PaginationLink>
        </PaginationItem>
        )
    }

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(renderLink(i));
        }
    } else {
        for (let i = 1; i <= 2; i++) {
            pages.push(renderLink(i));
        }
        if (2 < currentPage && currentPage < totalPages - 1) {
            pages.push(<PaginationEllipsis />)
            pages.push(renderLink(currentPage));
        }
        pages.push(<PaginationEllipsis />)
        for (let i = totalPages - 1; i <= totalPages; i++) {
            pages.push(renderLink(i));
        }
    }
    return pages;
};