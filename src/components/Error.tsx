interface ErrorProps {
  errorData: string;
}

function ErrorMessage({ errorData }: ErrorProps): React.ReactElement {
  return (
    <div className='bg-lightGray p-4 rounded-lg min-h- text-bpBlue text-center'>
      <h2>Uh oh.</h2>
      <p>{`Something went wrong while loading your ${errorData}.`}</p>
      <p>Please reload the page to try again.</p>
    </div>
  )
}

export default ErrorMessage
