import { useState, useEffect, ReactNode } from 'react'
import bpLogo from './assets/bp_icon.svg'
import './App.css'
import Account from './components/Account'
import Loading from './components/Loading'

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

function App() {
  const [accounts, setAccounts] = useState<AccountType[]>()
  const [transactions, setTransactions] = useState()
  const [loading, setLoading] = useState({
    transactions: true,
    accounts: true
  })
  const [errors, setErrors] = useState({
    transactions: false,
    accounts: false
  })

  const fetchAccountsAndTransactions = async (): Promise<any> => {
    const transRes: Response = await fetch(`${baseUrl}/transactions`)
    const accRes: Response = await fetch(`${baseUrl}/bank-accounts`)
    const responses = await Promise.allSettled([transRes,accRes])

    if (responses[0].status === "fulfilled") {
      const transData = await responses[0].value.json()
      setTransactions(transData.data.transactions)
      setLoading({...loading, transactions: false})
    } else {
      setErrors({...errors, transactions: true})
    }

    if (responses[1].status === "fulfilled") {
      const accData = await responses[1].value.json()
      setAccounts(accData.data.bank_accounts)
      setLoading({...loading, accounts: false})

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

  return (
    <>
      <header className="p-4 border-solid border-b border-gray-400">
        <div className="max-w-6xl m-auto">
          <img src={bpLogo} />
        </div>
      </header>
      <section className="p-4">
        <h1 className='text-bpBlue max-w-6xl m-auto'>Accounts</h1>
        {loading.accounts ?
          <>
            <Loading />
          </>:
          <>{accountCards}</>
        }
      </section>
    </>
  )
}

export default App
