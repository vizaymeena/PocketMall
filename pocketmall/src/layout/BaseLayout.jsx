import { PrimaryNavbar,Footer } from './PrimaryNavbar'
import '../assets/style/base.css'
import { Outlet } from 'react-router-dom'

function Base() {
  return (
    <>
    <div>
        <PrimaryNavbar/>
    </div>
    <main>
      <Outlet/>
    </main>
    <footer>
    <Footer/>
    </footer>
    </>
  )
}

export default Base
