import type { Invoice } from "@/schemas/invoice";
import { ChevronLeftIcon, ChevronRightIcon, Ellipsis } from "lucide-react";
import { type Table as TableType } from "@tanstack/react-table";
import { Button } from "../ui/shadcn/button";

export default function Pagination({ table }: { table: TableType<Invoice> }) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const handlePageClick = (page: number) => {
    if (page === currentPage) return;
    table.setPageIndex(page - 1);
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeftIcon className="size-5" />
      </Button>
      {currentPage > 2 && (
        <Button variant="ghost" size="icon" onClick={() => table.firstPage()}>
          1
        </Button>
      )}
      {currentPage > 3 && <Ellipsis className="size-4" />}
      {Array.from({ length: 3 }, (_, i) => {
        const page = currentPage + (i - 1);
        if (page < 1 || page > totalPages) return null;
        return (
          <Button
            key={currentPage + (i - 1)}
            size="icon"
            variant="ghost"
            className={
              currentPage === page ? "bg-muted pointer-events-none" : ""
            }
            onClick={() => handlePageClick(page)}
          >
            {page}
          </Button>
        );
      })}
      {currentPage < totalPages - 2 && <Ellipsis className="size-4" />}
      {currentPage <= totalPages - 2 && (
        <Button variant="ghost" size="icon" onClick={() => table.lastPage()}>
          {totalPages}
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRightIcon className="size-5" />
      </Button>
    </div>
  );
}
