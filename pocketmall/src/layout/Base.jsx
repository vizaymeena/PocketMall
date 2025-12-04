import { PrimaryNavbar } from "./Navbar"
import '../assets/style/base.css'
import { Outlet } from 'react-router-dom'
import { Footer } from "./Navbar"
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