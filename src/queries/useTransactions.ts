import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TransactionType } from "../types";

type UseTransactions = () => UseQueryResult<TransactionType[], Error>;

const fetchTransactions = async (): Promise<void> => {
  const response: Response = await fetch(`${import.meta.env.VITE_API_URL}/transactions`);
  const transactionData = await response.json();

  return transactionData.data.transactions
}

  export const UseTransactions: UseTransactions = () =>
    useQuery({
      queryKey: ["transactions"],
      queryFn: () => fetchTransactions()
    });
