import { TransactionType } from "../types"
import TransactionCard from "./TransactionCard"
import TransactionRow from "./TransactionRow"

interface TransactionsProps {
  transactions: TransactionType[] | null
}

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  const transRows = transactions?.map((transaction: TransactionType): React.JSX.Element => {
    return (
      <TransactionRow
        transaction={transaction}
        key={transaction.id}
      />
    )
  })

  const transCards = transactions?.map((transaction: TransactionType): React.JSX.Element => {
    return (
      <TransactionCard
        transaction={transaction}
        key={transaction.id}
      />
    )
  })

  return (
    <>
      <h2 className='p-4 border-gray-400 border-b border-solid rounded-t-lg text-bpBlue'>Transactions</h2>
        <div className='px-4 py-2'>
          <table className='hidden lg:table w-full text-xs text-left'>
            <thead>
              <tr className='text-left'>
                <th className=''>Date</th>
                <th className=''>Company</th>
                <th className=''>Amount</th>
                <th className=''>Status</th>
                <th className=''>Beneficiary</th>
                <th className=''>Institution</th>
                <th className=''>Type</th>
                <th className=''>Trace Number</th>
              </tr>
            </thead>
            <tbody>
              {transRows}
            </tbody>
          </table>
          <div>
            {transCards}
          </div>
        </div>
    </>
  )
}

export default Transactions
