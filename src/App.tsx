// import { useState } from 'react'
import bpLogo from './assets/bp_icon.svg'
import './App.css'
import Account from './components/Account'

function App() {
  // const [userAccounts, setUserAccounts] = useState()

  return (
    <>
      <header className="p-4 border-solid border-b border-gray-400">
        <div className="max-w-6xl m-auto">
          <img src={bpLogo} />
        </div>
      </header>
      <section className="p-4">
        <h1 className='text-bpBlue max-w-6xl m-auto'>Accounts</h1>
        <Account name={"My Bank Account"} />
      </section>
    </>
  )
}

export default App
