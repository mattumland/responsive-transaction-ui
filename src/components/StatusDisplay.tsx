interface StatusProps {
  status: 'SENT' | 'PROCESSING' | 'RETURNED' | 'PENDING' | 'FAILED' | 'DONE'
}

const StatusDisplay: React.FC<StatusProps> = ({ status }) => {
  let colorClass: string
  switch (status) {
    case "SENT":
    case "DONE":
      colorClass = "bg-success"
      break;
    case "PENDING":
    case "PROCESSING":
      colorClass = "bg-pending"
      break;
    case "FAILED":
    case "RETURNED":
      colorClass = "bg-fail"
      break;
    default:
      colorClass = "bg-gray-400"
      break;
  }

  return (
    <p className={`${colorClass} text-lightGray font-bold  mt-1 px-2 rounded-md min-w-20 text-center lg:max-w-full lg:mr-2`}>{status}</p>
  );
};

export default StatusDisplay;
