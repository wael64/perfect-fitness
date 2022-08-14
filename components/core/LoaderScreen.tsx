import { Loader } from '@mantine/core'

const LoaderScreen = () => {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-secondary-dark z-[100] flex justify-center items-center'>
      <Loader color='primary' />
    </div>
  )
}

export default LoaderScreen
