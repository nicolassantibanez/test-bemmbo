type Invoice = {
  id: string;
  receiverName: string;
  amount: number;
  currency: "CLP" | "USD";
  injected?: boolean;
  // selected:
};

export type { Invoice };
