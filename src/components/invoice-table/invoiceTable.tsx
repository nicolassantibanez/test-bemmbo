import type { Invoice } from "@/schemas/invoice";
import { Checkbox } from "../ui/shadcn/checkbox";
import { CheckIcon, Loader2, XIcon } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/shadcn/table";
import { useState } from "react";
import Pagination from "./pagination";
import Filters from "./filters";
import { Button } from "../ui/shadcn/button";
import { useMutation } from "@tanstack/react-query";
import { injectInvoices } from "@/api/invoices";

type InvoiceTableProps = {
  invoices: Invoice[];
  isLoading?: boolean;
};

export default function InvoiceTable({
  invoices,
  isLoading = false,
}: InvoiceTableProps) {
  const [rowSelection, setRowSelection] = useState({});
  const { mutate: injectInvoicesMutation } = useMutation({
    mutationFn: injectInvoices,
  });

  const handleInjectClick = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    if (selectedRows.length === 0) {
      return; // No rows selected
    }

    const selectedInvoiceIds = selectedRows.map((row) => row.original.id);
    console.log("selectedInvoiceIds", selectedInvoiceIds);
    injectInvoicesMutation(selectedInvoiceIds);
  };

  const table = useReactTable({
    data: invoices,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 12,
      },
    },
    state: {
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Filters table={table} />
        <Button onClick={handleInjectClick}>Inyectar</Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Loader2 className="size-8 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} />
    </div>
  );
}

function InjectedBadge({ injected }: { injected: boolean }) {
  return (
    <span
      className={`inline-flex p-1.5 text-xs mx-auto text-white font-semibold rounded-md ${
        injected ? "bg-green-100" : "bg-red-100 "
      }`}
    >
      {injected ? (
        <span className="bg-green-500 p-0.5 rounded-full">
          <CheckIcon className="size-2.5" />
        </span>
      ) : (
        <span className="bg-red-500 p-0.5 rounded-full">
          <XIcon className="size-2.5" />
        </span>
      )}
    </span>
  );
}

const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    accessorKey: "id",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    id: "receiverName",
    accessorKey: "receiverName",
    header: "Emisor",
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: "Monto",
  },
  {
    id: "currency",
    accessorKey: "currency",
    header: "Moneda",
    enableColumnFilter: true,
  },
  {
    id: "injected",
    accessorFn: (row) => (row.injected ? "ready" : "pending"),
    header: "Inyectado",
    cell: (props) => <InjectedBadge injected={!!props.row.original.injected} />,
  },
];
