import type { Invoice } from "@/schemas/invoice";
import { client } from "./config";

async function getInvoices(): Promise<Invoice[]> {
  const response = await client.get("/invoices");
  return response.data;
}

export { getInvoices };
