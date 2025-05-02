import { useState, useEffect, lazy, Suspense } from 'react'
import bpLogo from './assets/bp_icon.svg'
import './App.css'
import Transactions from './components/Transactions'
import Loading from './components/Loading'
import ErrorMessage from './components/Error'
import { AccountType, TransactionType } from './types'

const Account = lazy(() => import('./components/Account'))

export const baseUrl = 'https://api.dev.backpackpay.com/api/v1/mocks'

function App(): React.ReactElement {
  const [accounts, setAccounts] = useState<AccountType[] | null>(null)
  const [transactions, setTransactions] = useState<TransactionType[] | null>(null)
  const [errors, setErrors] = useState({
    transactions: false,
    accounts: false
  })

  const fetchAccountsAndTransactions = async (): Promise<void> => {
    const transRes: Response = await fetch(`${baseUrl}/transactions`)
    const accRes: Response = await fetch(`${baseUrl}/bank-accounts`)
    const responses = await Promise.allSettled([transRes,accRes])

    if (responses[0].status === 'fulfilled') {
      if (!responses[0].value.ok) {
        setErrors({ ...errors, transactions: true })
        return
      }
      const transData = await responses[0].value.json()
      setTransactions(transData.data.transactions)
    } else {
      setErrors({...errors, transactions: true})
    }

    if (responses[1].status === 'fulfilled') {
      if (!responses[1].value.ok) {
        setErrors({ ...errors, accounts: true })
        return
      }
      const accData = await responses[1].value.json()
      setAccounts(accData.data.bank_accounts)
    } else {
      setErrors({...errors, accounts: true})
    }
  }

  useEffect(() => {
    fetchAccountsAndTransactions()
  }, [])

  const accountCards = accounts?.map((account: AccountType): React.JSX.Element => {
    return (
      <Account
        name={account.name}
        id={account.id}
        accountNumber={account.account_number}
        routingNumber={account.routing_number}
        key={account.id}
      />
    )
  })

  return (
    <>
      <header className='p-4 border-gray-400 border-b border-solid'>
        <div className='m-auto'>
          <img src={bpLogo} alt={'Backpack logo and title'} width='170' height='35'/>
        </div>
      </header>
      <main className='p-4'>
        <h1 className='m-auto mb-2 text-bpBlue'>Accounts & Transactions</h1>
        <Suspense fallback={<Loading />}>
          <div className='xl:flex lg:gap-3 m-auto'>
            <section className='min-w-1/4'>
              {errors.accounts ? <ErrorMessage errorData='accounts' /> : accountCards}
            </section>
            <section className='flex-4/5 bg-lightGray mt-4 lg:mt-4 xl:mt-0 rounded-lg'>
              {errors.transactions ? <ErrorMessage errorData='transactions' /> : <Transactions transactions={transactions} />}
            </section>
          </div>
        </Suspense>
      </main>
    </>
  )
}

export default App
