import { useState, useEffect, ReactNode, lazy, Suspense } from 'react'
import bpLogo from './assets/bp_icon.svg'
import './App.css'
import Transaction from './components/Transaction'
import Loading from './components/Loading'
import ErrorMessage from './components/Error'

const Account = lazy(() => import('./components/Account'))

const baseUrl = 'https://api.dev.backpackpay.com/api/v1/mocks'

type AccountType = {
    "id": string;
    "created_at": string;
    "updated_at": string;
    "status": string;
    "name": string;
    "account_number": string;
    "routing_number": string;
}

export type TransactionType = {
  "id": string;
  "created_at": string;
  "updated_at": string;
  "type": string;
  "date": string;
  "description": string;
  "enriched_description": string;
  "amount_in_cents": number
  "company_name": string;
  "trace_number": string;
  "transaction_id": string;
  "status": "SENT" | "PROCESSING" | "RETURNED" | "PENDING" | "FAILED" | "DONE"
  "method": string;
  "company_description": string;
  "processed_dt": string;
  "metadata"?: {
    "institution_payment": {
      "id": string;
      "type": string;
      "status": string;
      "institution": {
        "id": string;
        "name": string;
      },
      "beneficiary": {
        "id": string;
        "first_name": string;
        "last_name": string;
      },
      "enrollment_period": {
        "id": string;
        "description": string;
      }
    }
  }
}

function App() {
  const [accounts, setAccounts] = useState<AccountType[]>()
  const [transactions, setTransactions] = useState<TransactionType[]>()
  const [errors, setErrors] = useState({
    transactions: false,
    accounts: false
  })

  const fetchAccountsAndTransactions = async (): Promise<any> => {
    const transRes: Response = await fetch(`${baseUrl}/transactions`)
    const accRes: Response = await fetch(`${baseUrl}/bank-accounts`)
    const responses = await Promise.allSettled([transRes,accRes])

    if (responses[0].status === "fulfilled") {
      if (!responses[0].value.ok) {
        setErrors({ ...errors, transactions: true })
        return
      }
      const transData = await responses[0].value.json()
      setTransactions(transData.data.transactions)
    } else {
      setErrors({...errors, transactions: true})
    }

    if (responses[1].status === "fulfilled") {
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

  const accountCards = accounts?.map((account: AccountType): ReactNode => {
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

  const transactionCards = transactions?.map((transaction: TransactionType): ReactNode => {
    return (
      <Transaction
        transaction={transaction}
        key={transaction.id}
      />
    )
  })

  return (
    <>
      <header className="p-4 border-gray-400 border-b border-solid">
        <div className="m-auto max-w-6xl">
          <img src={bpLogo} alt={"Backpack logo and title"} width="170" height="35"/>
        </div>
      </header>
      <main className="p-4">
        <h1 className='m-auto mb-2 max-w-6xl text-bpBlue'>Accounts & Transactions</h1>
        <Suspense fallback={<Loading />}>
          <div className='lg:flex lg:gap-3 m-auto max-w-6xl'>
            <section className="flex-1/3">
              {errors.accounts ? <ErrorMessage errorData='accounts' /> : accountCards}
            </section>
            <section className="flex-2/3 bg-lightGray mt-4 lg:mt-0 rounded-lg">
              {errors.transactions ? <ErrorMessage errorData='transactions' /> :
                <div>
                  <h2 className="p-4 border-gray-400 border-b border-solid rounded-t-lg text-bpBlue">Transactions</h2>
                  <div>
                    {transactionCards}
                  </div>
                </div>
              }
            </section>
          </div>
        </Suspense>
      </main>
    </>
  )
}

export default App
