import { TransactionType } from "../App"
import Transaction from "./Transaction"
import ClickToCopy from "./ClickToCopy"

interface TransactionsProps {
  transactions: TransactionType[] | null
}

type MetadataType = {
  'id': string;
  'type': string;
  'status': string;
  'institution': {
    'id': string;
    'name': string;
  },
  'beneficiary': {
    'id': string;
    'first_name': string;
    'last_name': string;
  },
  'enrollment_period': {
    'id': string;
    'description': string;
  }
}

interface StatusProps {
  status: 'SENT' | 'PROCESSING' | 'RETURNED' | 'PENDING' | 'FAILED' | 'DONE'
}

function StatusDisplay({ status }: StatusProps): React.JSX.Element {
  let colorClass = 'bg-gray-400'

  if (status === 'SENT' || status === 'DONE') {
    colorClass = 'bg-success'
  } else if (status === 'PENDING' || status === 'PROCESSING') {
    colorClass = 'bg-pending'
  } else if (status === 'FAILED' || status === 'RETURNED') {
    colorClass = 'bg-fail'
  }

  return (
    <p className={`${colorClass} text-lightGray font-bold rounded-md text-center max-w-3/4`}>{status}</p>
  )
}

function Transactions({ transactions }: TransactionsProps): React.ReactElement {
  const transRows = transactions?.map((trans: TransactionType): React.JSX.Element => {
    const { date, company_name, amount_in_cents, status, trace_number } = trans

    let metadata: MetadataType | null = null
    if (trans.metadata?.institution_payment) {
      metadata = trans.metadata.institution_payment
    }

    return (
      <tr className='text-left'>
        <td>{formatDate(date)}</td>
        <td>{company_name}</td>
        <td className='font-bold'>{formatAmount(amount_in_cents)}</td>
        <td><StatusDisplay status={status} /></td>
        <td>{metadata ? `${metadata.beneficiary.first_name} ${metadata.beneficiary.last_name}` : ""}</td>
        <td>{metadata ? metadata.institution.name : ""}</td>
        <td>{metadata ? `${metadata.enrollment_period.description} ${metadata.type.toLowerCase()}` : ""}</td>
        <td><ClickToCopy text={trace_number} /></td>
      </tr>
    )
  })

  const transCards = transactions?.map((transaction: TransactionType): React.JSX.Element => {
    return (
      <Transaction
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

// helper functions

const formatAmount = (amount_in_cents: number): string => {
  return (amount_in_cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const formatDate = (date: string): string => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('ed-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}