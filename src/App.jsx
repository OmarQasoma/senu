import { Outlet } from 'react-router'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App