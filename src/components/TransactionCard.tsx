import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { TransactionType, MetadataType } from '../types';
import ClickToCopy from './ClickToCopy';
import StatusDisplay from './StatusDisplay';
import { formatAmount, formatDate } from '../utils';

interface TransactionProps {
  transaction: TransactionType
}

const TransactionCard: React.FC<TransactionProps> = ({ transaction }) => {
  const { date, company_name, amount_in_cents, status, trace_number } = transaction;

  let metadata: MetadataType | null = null;
  if (transaction.metadata?.institution_payment) {
    metadata = transaction.metadata.institution_payment;
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
  );
};

export default TransactionCard;
