import { useState } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './CSS/App.css'
import StatCalculator from './components/StatCalculator.jsx'
import NavLayout from './pages/NavLayout';
import NotFound from './pages/NotFound'
import Home from './pages/Home'

function App() {
  const [user, setUser] = useState(null)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavLayout user={user} setUser={setUser} />}>
        <Route path="/" element={<Home user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <>
      <StatCalculator />
      {/* <RouterProvider router={router} /> */}
    </>
  )
}

export default App
