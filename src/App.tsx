import bpLogo from './assets/bp_icon.svg'
import './App.css'

function App() {

  return (
    <>
      <header className="p-4 border-solid border-b border-gray-600">
        <div className="max-w-6xl m-auto">
          <img src={bpLogo} />
        </div>
      </header>
      <section className="max-w-6xl p-4 m-auto">
        <h1 className='text-bpblue '>Accounts</h1>
      </section>
    </>
  )
}

export default App
