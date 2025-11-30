import { PrimaryNavbar } from "./Navbar";
import '../assets/style/base.css';
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

    </footer>
    </>
  )
}

export default Base