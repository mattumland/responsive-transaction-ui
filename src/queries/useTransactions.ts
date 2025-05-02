import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { baseUrl } from "../App";
import { TransactionType } from "../types";

type UseTransactions = () => UseQueryResult<TransactionType[], Error>;

const fetchTransactions = async (): Promise<void> => {
  const response: Response = await fetch(`${baseUrl}/transactions`)
  const transactionData = await response.json()

  return transactionData.data.transactions
}

  export const UseTransactions: UseTransactions = () =>
    useQuery({
      queryKey: ["transactions"],
      queryFn: () => fetchTransactions()
    });