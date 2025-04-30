import icon from '../assets/bp_icon_only.svg'

function Loading() {
  return (
    <div className="flex flex-col text-center text-bpBlue mt-20 animate-bounce" >
      <img src={icon} className='max-w-20 m-auto'/>
      <h2>Loading</h2>
    </div>
  )
}

export default Loading
