import { Outlet } from 'react-router-dom'
import '../assets/style/base.css'
import { Footer, PrimaryNavbar } from './PrimaryNavbar'

function Base() {
  return (
    <>
      <div>
        <PrimaryNavbar />
      </div>
      <main style={{ minHeight: '100vh' }}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Base

