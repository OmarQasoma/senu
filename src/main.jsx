import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import Watchlist from './components/Watchlist.jsx'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import './index.css'

// router configuration setting.
const router = createHashRouter([
  {
    path: '/',
    Component: App, // parent component
    children: [
      {
        index: true,
        Component: Home, // child component for the home page
      },
      {
        path: 'movie/:movieId',  // child component for the home page
        Component: MovieDetails,
      },
      {
        path: 'watchlist',  // child component for the home page
        Component: Watchlist,
      },
    ],
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)