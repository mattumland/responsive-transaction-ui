import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TransactionType } from "../types";
import { apiUrl } from "../App";

type UseTransactions = () => UseQueryResult<TransactionType[], Error>;

const fetchTransactions = async (): Promise<void> => {
  const response: Response = await fetch(`${apiUrl}/transactions`);
  const transactionData = await response.json();

  return transactionData.data.transactions
}

  export const UseTransactions: UseTransactions = () =>
    useQuery({
      queryKey: ["transactions"],
      queryFn: () => fetchTransactions()
    });
