import { useState } from 'react'
import { Outlet } from 'react-router'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import {
  getWatchlist,
  toggleWatchlist,
} from './storage/localStorage.js'



function App() {
  const [watchlist, updateWatchlist] = useState(() => getWatchlist())

  
  function handleToggleWatchlist(movie) { // add/remove logic ,MovieCard and Hero use the same watchlist .
    const updatedWatchlist = toggleWatchlist(movie)
    updateWatchlist(updatedWatchlist)
  }


  
  return (
    <>
      <Navbar />

      <Outlet context={{ watchlist, changeWatchlist: handleToggleWatchlist,
  }}
/>

      <Footer />
    </>
  )
}

export default App
