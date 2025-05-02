import { TransactionType, MetadataType } from '../types';
import ClickToCopy from './ClickToCopy';
import StatusDisplay from './StatusDisplay';
import { formatAmount, formatDate } from '../utils';

interface TransactionProps {
  transaction: TransactionType
}

const TransactionRow: React.FC<TransactionProps> = ({ transaction }) => {
  const { date, company_name, amount_in_cents, status, trace_number, id } = transaction;

  let metadata: MetadataType | null = null;
  if (transaction.metadata?.institution_payment) {
    metadata = transaction.metadata.institution_payment;
  }

  return (
    <tr className='text-left' key={id}>
      <td>{formatDate(date)}</td>
      <td>{company_name}</td>
      <td className='font-bold'>{formatAmount(amount_in_cents)}</td>
      <td><StatusDisplay status={status} /></td>
      <td>{metadata ? `${metadata.beneficiary.first_name} ${metadata.beneficiary.last_name}` : ""}</td>
      <td>{metadata ? metadata.institution.name : ""}</td>
      <td>{metadata ? `${metadata.enrollment_period.description} ${metadata.type.toLowerCase()}` : ""}</td>
      <td><ClickToCopy text={trace_number} /></td>
    </tr>
  );
};

export default TransactionRow;
