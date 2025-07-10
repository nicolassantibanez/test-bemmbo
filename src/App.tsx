import { getInvoices } from "./api/invoices";
import { useQuery } from "@tanstack/react-query";
import InvoiceTable from "./components/invoice-table/invoiceTable";

// Sample data for the table

function App() {
  const { data: invoices, isPending } = useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  });

  console.log("Total invoices", invoices?.length);
  console.log("Invoice:", invoices?.[0]);

  return (
    <main className="min-h-screen min-w-screen space-y-4 p-4">
      <div className="bg-white rounded-lg  overflow-hidden">
        <InvoiceTable invoices={invoices ?? []} isLoading={isPending} />
      </div>
    </main>
  );
}

export default App;
