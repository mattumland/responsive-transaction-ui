import icon from '../assets/bp_icon_only.svg'

const Loading: React.FC = () => {
  return (
    <div className='mt-20 text-bpBlue text-center' >
      <img src={icon} alt={'backpack logo'} className='m-auto max-w-20 animate-bounce'/>
      <h2 className='animate-pulse'>Loading</h2>
    </div>
  )
}

export default Loading
