import type { Invoice } from "@/schemas/invoice";
import { client } from "./config";

async function getInvoices(): Promise<Invoice[]> {
  const response = await client.get("/invoices");
  return response.data;
}

async function injectInvoices(invoiceIds: string[]): Promise<Invoice[]> {
  const response = await client.post("/invoices/inject", {
    invoiceIds,
  });
  return response.data;
}

export { getInvoices, injectInvoices };
