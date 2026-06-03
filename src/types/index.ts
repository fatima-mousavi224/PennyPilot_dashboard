export interface Transaction {
  id: string;
  name: string;
  date: string;
  category: string;
  amount: number;
  type: "food" | "transport" | "entertainment" | "school" | "other";
}