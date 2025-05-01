import { useState, useEffect } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import ClickToCopy from './ClickToCopy'
import ErrorMessage from './Error'

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
  const {available_balance_in_cents, pending_balance_in_cents} = data.data.bank_account_balance

  return {
    availableBalance: (available_balance_in_cents/100).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    pendingBalance: (pending_balance_in_cents/100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }
}

function Account({ name, id, accountNumber, routingNumber }: AccountProps): React.JSX.Element {
  const [balance, setBalance] = useState<Balance>()
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchBalance = async (): Promise<any> => {
      try {
        const response: Response = await fetch(`https://api.dev.backpackpay.com/api/v1/mocks/bank-accounts/${id}/balance`)
        if (!response.ok) {
          setError(true)
          return
        }
        const balanceData: BalanceResponse = await response.json()
        setBalance(formatBalanceData(balanceData));
      } catch (error) {
        setError(true)
      }
    }

    fetchBalance();
  }, [])


  return (
    <section className='bg-lightGray rounded-lg transition-all duration-500 ease-in'>
      <h2 className='bg-bpBlue p-4 border-b-1 border-bpBlue rounded-t-lg text-lightGray'>{name}</h2>
      {error ? <ErrorMessage errorData='balance' /> :
        <div className='p-4 min-h-24 text-gray-600 text-right'>
          <p className='text-4xl'>{balance?.availableBalance}</p>
          <p>Available balance</p>
        </div>
      }
      <Disclosure as='div' className='p-4'>
        <DisclosureButton className='group flex items-center gap-2 border-transparent border-b-2 hover:border-b-2 hover:border-bpBlue text-bpBlue transition-all hover:cursor-pointer'>
          <h3>Account Details</h3>
          <ChevronDownIcon className='w-5 group-data-open:rotate-180 transition-all' />
        </DisclosureButton>
        <DisclosurePanel
          transition
          className='data-closed:opacity-0 text-gray-600 duration-100 ease-in'
        >
          {!error &&
            <div className='flex justify-between mt-2 text-lg'>
              <p>Pending balance</p>
              <p>{balance?.pendingBalance}</p>
            </div>
          }
          <div className='mt-2'>
            <p className='font-medium'>Account Number</p>
            <ClickToCopy text={accountNumber}/>
            <p className='font-medium'>Routing Number</p>
            <ClickToCopy text={routingNumber}/>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </section>
  )
}

export default Account
