import { useQuery, UseQueryResult } from "@tanstack/react-query";

type UseBalance = (
  accountId: string
) => UseQueryResult<Balance, Error>;

type Balance = {
  availableBalance: string;
  pendingBalance: string;
};

type BalanceResponse = {
  data: {
    bank_account_balance: {
      bank_account_id: string;
      available_balance_in_cents: number;
      pending_balance_in_cents: number;
    }
  }
}

const formatBalanceData = (data: BalanceResponse): Balance => {
  const {available_balance_in_cents, pending_balance_in_cents} = data.data.bank_account_balance

  return {
    availableBalance: (available_balance_in_cents/100).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    pendingBalance: (pending_balance_in_cents/100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }
}

const fetchBalance = async (id: string) => {
    const response: Response = await fetch(`https://api.dev.backpackpay.com/api/v1/mocks/bank-accounts/${id}/balance`)

    const balanceData: BalanceResponse = await response.json()

    return formatBalanceData(balanceData)
}

export const useBalance: UseBalance = (accountId) =>
  useQuery({
    queryKey: ["balance", accountId],
    queryFn: () => fetchBalance(accountId),
  });
