import type { Invoice } from "@/schemas/invoice";
import { type Table as TableType } from "@tanstack/react-table";
import { Input } from "../ui/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/shadcn/select";
import { Button } from "../ui/shadcn/button";
import { CornerUpLeft } from "lucide-react";
export default function Filters({ table }: { table: TableType<Invoice> }) {
  return (
    <div className="flex gap-x-2 items-end">
      <div className="flex flex-col gap-y-1">
        <label htmlFor="search">Buscar</label>
        <Input
          placeholder="Buscar por nombre"
          type="text"
          id="search"
          value={
            (table.getColumn("receiverName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("receiverName")?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="currencies">Monedas</label>
        <Select
          defaultValue="all"
          value={
            (table.getColumn("currency")?.getFilterValue() as string) ?? "all"
          }
          onValueChange={(value) => {
            const filter = value === "all" ? "" : value;
            table.getColumn("currency")?.setFilterValue(filter);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="CLP">CLP</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-y-1 w-fit">
        <label htmlFor="injection">Estado de Inyección</label>
        <Select
          defaultValue="all"
          value={
            (table.getColumn("injected")?.getFilterValue() as string) ?? "all"
          }
          onValueChange={(value) => {
            const filter = value === "all" ? "" : value;
            table.getColumn("injected")?.setFilterValue(filter);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="ready">Inyectado</SelectItem>
            <SelectItem value="pending">Pendiente</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="secondary"
        onClick={() => {
          table.resetColumnFilters();
        }}
      >
        <CornerUpLeft className="size-4 mr-1" />
        Limpiar
      </Button>
    </div>
  );
}
