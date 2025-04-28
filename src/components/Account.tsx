import { useState, useEffect } from "react"

interface AccountProps {
  name: string;
  id?: string;
  accountNumber?: string;
  routingNumber?: string;
}

type Balance = {
  availableBalance: string;
  pendingBalance: string;
}

type BalanceResponse = {
  data: {
      bank_account_balance: {
        bank_account_id: string;
        available_balance_in_cents: number;
        pending_balance_in_cents: number;
      }
    }
  }

export const formatBalanceData = (data: BalanceResponse): Balance => {
  const { bank_account_balance } = data.data
  const availableDollars = bank_account_balance.available_balance_in_cents/100
  const pendingDollars = bank_account_balance.pending_balance_in_cents/100

  return {
    availableBalance:`$${availableDollars.toFixed(2).toString()}`,
    pendingBalance: `$${pendingDollars.toFixed(2).toString()}`
  }
}

function Account({ name, id = '3e07bdce-b5d5-417e-96bc-77da3c1094f0' }: AccountProps) {
  // const [loading, setLoading] = useState(true)
  const [balance, setBalance] = useState<Balance>()

  useEffect(() => {
    const fetchBalance = async (): Promise<any> => {
      try {
        const response: Response = await fetch(`https://api.dev.backpackpay.com/api/v1/mocks/bank-accounts/${id}/balance`)
        if (!response.ok) {
          console.error("---SOMETHING WENT WRONG---") //better error, maybe a toast?
          return
        }
        const balanceData: BalanceResponse = await response.json()
        setBalance(formatBalanceData(balanceData));
        // setLoading(false)
      } catch (error) {
        console.error("Something went wrong:", error) //better error, maybe a toast?
      }
    }

    fetchBalance();
  }, [])

  return (
    <section className="bg-lightGray rounded-lg">
      <h2 className="bg-bpBlue text-lightGray p-4 rounded-t-lg">{name}</h2>
      <div className="p-4 text-right">
        <p className="text-4xl">{balance?.availableBalance}</p>
        <p>Available balance</p>
      </div>
    </section>
  )
}

export default Account