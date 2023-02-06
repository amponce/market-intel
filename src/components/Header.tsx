import Link from 'next/link'
import Nav from './Nav'
const Header = () => {
  return (
    //  add some padding to the top of the page and bottom of the header component to make it look better
    <header className='py-8'>
      <div className='container mx-auto px-4'>
        <Nav />
      </div>
    </header>
  )
}

export default Header
