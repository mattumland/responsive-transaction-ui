import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { baseUrl } from "../App";
import { AccountType } from "../types";

type UseAccounts = () => UseQueryResult<AccountType[], Error>;

const fetchAccounts = async (): Promise<void> => {
  const response: Response = await fetch(`${baseUrl}/bank-accounts`)
  const accountData = await response.json()

  return accountData.data.bank_accounts
}

  export const useAccounts: UseAccounts = () =>
    useQuery({
      queryKey: ["accounts"],
      queryFn: () => fetchAccounts()
    });
