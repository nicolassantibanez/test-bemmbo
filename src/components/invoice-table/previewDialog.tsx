import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/shadcn/dialog";
import { Button } from "../ui/shadcn/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/shadcn/dialog";
import type { Invoice } from "@/schemas/invoice";
import type { Table as TableType } from "@tanstack/react-table";

interface PreviewDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  table: TableType<Invoice>;
  onConfirmation?: () => void;
}

export default function PreviewDialog({
  isDialogOpen,
  setIsDialogOpen,
  table,
  onConfirmation,
}: PreviewDialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Inyección</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres inyectar las siguientes facturas?
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-60 overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-2 font-medium">Emisor</th>
                <th className="text-left p-2 font-medium">Monto</th>
                <th className="text-left p-2 font-medium">Moneda</th>
              </tr>
            </thead>
            <tbody>
              {table.getSelectedRowModel().rows.map((row) => (
                <tr key={row.original.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{row.original.receiverName}</td>
                  <td className="p-2">{row.original.amount}</td>
                  <td className="p-2">{row.original.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={onConfirmation}>Confirmar Inyección</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
