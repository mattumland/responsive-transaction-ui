import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { TransactionType, MetadataType } from '../types'
import ClickToCopy from './ClickToCopy'
import { formatAmount } from '../utils'

interface TransactionProps {
  transaction: TransactionType
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
    <p className={`${colorClass} text-lightGray font-bold  mt-1 px-2 rounded-md min-w-20 text-center`}>{status}</p>
  )
}

function Transaction({ transaction }: TransactionProps): React.ReactElement {
  const { date, company_name, amount_in_cents, status, trace_number } = transaction

  let metadata: MetadataType | null = null
  if (transaction.metadata?.institution_payment) {
    metadata = transaction.metadata.institution_payment
  }

  return (
    <div className='mb-5 px-4 text-sm'>
      <div className='lg:hidden flex justify-between my-2'>
        <div>
          <p>{formatDate(date)}</p>
          <p className='mt-1'>{company_name}</p>
        </div>
        <div>
          <p className='font-bold text-right'>{formatAmount(amount_in_cents)}</p>
          <StatusDisplay status={status} />
        </div>
      </div>
      {metadata &&
        <div className='lg:hidden mb-2'>
          <p className='self-end font-bold'>{`${metadata.beneficiary.first_name} ${metadata.beneficiary.last_name}`}</p>
          <div className='flex justify-between'>
            <p>{metadata.institution.name}</p>
            <p>{`${metadata.enrollment_period.description} ${metadata.type.toLowerCase()}`}</p>
          </div>
        </div>
      }
      <Disclosure as='div' className='lg:hidden border-gray-400 border-b-1'>
        <DisclosureButton className='group flex items-center gap-2 mb-2 border-transparent border-b-2 hover:border-b-2 hover:border-bpBlue text-bpBlue transition-all hover:cursor-pointer'>
          <p>Trace Number</p>
          <ChevronDownIcon className='w-5 group-data-open:rotate-180 transition-all' />
        </DisclosureButton>
        <DisclosurePanel
          transition
          className='data-closed:opacity-0 text-gray-600 duration-100 ease-in'
        >
          <div className='mt-2 pb-3 border-gray-400 border-b-1'>
            <ClickToCopy text={trace_number} />
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}

export default Transaction


// helper functions

const formatDate = (date: string): string => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('ed-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
