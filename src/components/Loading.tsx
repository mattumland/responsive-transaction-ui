import icon from '../assets/bp_icon_only.svg'

function Loading(): React.JSX.Element {
  return (
    <div className="flex flex-col mt-20 text-bpBlue text-center animate-bounce" >
      <img src={icon} className='m-auto max-w-20'/>
      <h2>Loading</h2>
    </div>
  )
}

export default Loading
