interface StatusProps {
  status: 'SENT' | 'PROCESSING' | 'RETURNED' | 'PENDING' | 'FAILED' | 'DONE'
}

const StatusDisplay: React.FC<StatusProps> = ({ status }) => {
  let colorClass = 'bg-gray-400';

  if (status === 'SENT' || status === 'DONE') {
    colorClass = 'bg-success'
  } else if (status === 'PENDING' || status === 'PROCESSING') {
    colorClass = 'bg-pending'
  } else if (status === 'FAILED' || status === 'RETURNED') {
    colorClass = 'bg-fail'
  }

  return (
    <p className={`${colorClass} text-lightGray font-bold  mt-1 px-2 rounded-md min-w-20 text-center lg:max-w-full lg:mr-2`}>{status}</p>
  );
};

export default StatusDisplay;
