import { TransactionType } from "../App"

interface TransactionProps{
  transactionData?: TransactionType[]
}

function TransactionCard() {
  return (
    <div>

    </div>
  )
}


function Transactions({transactionData}: TransactionProps): React.JSX.Element {



  return (
    <section className="bg-lightGray rounded-lg mt-4">
        <h2 className="text-bpBlue p-4 rounded-t-lg  border-solid border-b border-gray-400">Transactions</h2>
        <div>MMONEY!!</div>
        <div>
          {/* {transactionData} */}
        </div>
    </section>
  )
}

export default Transactions