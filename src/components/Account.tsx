import { useState, useEffect } from "react"
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import ClickToCopy from "./ClickToCopy"

interface AccountProps {
  name: string;
  id: string;
  accountNumber: string;
  routingNumber: string;
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

const formatBalanceData = (data: BalanceResponse): Balance => {
  const { bank_account_balance } = data.data
  const availableDollars = bank_account_balance.available_balance_in_cents/100
  const pendingDollars = bank_account_balance.pending_balance_in_cents/100

  return {
    availableBalance:`$${availableDollars.toFixed(2).toString()}`,
    pendingBalance: `$${pendingDollars.toFixed(2).toString()}`
  }
}

function Account({ name, id = '3e07bdce-b5d5-417e-96bc-77da3c1094f0', accountNumber = '999999999999', routingNumber = '111111111'}: AccountProps): React.JSX.Element {
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
    <section className="bg-lightGray rounded-lg transition-all duration-500 ease-in ">
      <h2 className="bg-bpBlue text-lightGray p-4 rounded-t-lg">{name}</h2>
      <div className="min-h-24 p-4 text-right text-gray-600">
        <p className="text-4xl">{balance?.availableBalance}</p>
        <p>Available balance</p>
      </div>

      <Disclosure as="div" className="p-4">
        <DisclosureButton className="group flex items-center gap-2 text-bpBlue border-b-2 border-transparent hover:border-b-2 hover:border-bpBlue hover:cursor-pointer transition-all">
          <h3>Account Details</h3>
          <ChevronDownIcon className="w-5 group-data-open:rotate-180 transition-all" />
        </DisclosureButton>
        <DisclosurePanel
          transition
          className="text-gray-600 duration-100 ease-in data-closed:opacity-0"
        >
          <div className="flex justify-between mt-2 text-lg">
            <p>Pending balance</p>
            <p>{balance?.pendingBalance}</p>
          </div>
          <div className="mt-2">
            <p className="font-medium">Account Number</p>
            <ClickToCopy text={accountNumber}/>
            <p className="font-medium">Routing Number</p>
            <ClickToCopy text={routingNumber}/>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </section>
  )
}

export default Account