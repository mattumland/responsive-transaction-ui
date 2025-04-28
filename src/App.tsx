import bpLogo from './assets/bp_icon.svg'
import './App.css'
import { useState } from 'react'

function App() {
  const [userAccounts, setUserAccounts] = useState()
  const [loading, setLoading] = useState(true)

  return (
    <>
      <header className="p-4 border-solid border-b border-gray-600">
        <div className="max-w-6xl m-auto">
          <img src={bpLogo} />
        </div>
      </header>
      <section className="p-4">
        <h1 className='text-bpblue max-w-6xl m-auto'>Accounts</h1>
      </section>
    </>
  )
}

export default App
