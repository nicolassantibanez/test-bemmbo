import bemmboLogo from "./assets/bemmbo-logo.svg";
import { getInvoices } from "./api/invoices";
import { useQuery } from "@tanstack/react-query";
import InvoiceTable from "./components/invoice-table/invoiceTable";
import { Button } from "./components/ui/shadcn/button";

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
      {/* Header */}
      {/* <div className="flex items-center justify-center gap-x-3">
        <img src={bemmboLogo} alt="Bemmbo Logo" className="h-40 w-auto" />
        <h1 className="text-3xl font-bold text-gray-900">Data Table Demo</h1>
      </div> */}

      {/* Button Section */}

      {/* Data Table */}
      <div className="bg-white rounded-lg  overflow-hidden">
        <InvoiceTable invoices={invoices ?? []} isLoading={isPending} />
      </div>
    </main>
  );
}

export default App;
