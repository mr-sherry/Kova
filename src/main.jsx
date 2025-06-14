import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Mining from './Pages/Mining/Mining.jsx'
import Register from './Pages/Auth/Register.jsx'
import Login from './Pages/Auth/Login.jsx'
import Leaderboard from './Pages/LeaderBoard/Leaderboard.jsx'
import About from './Pages/About/About.jsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Mining />} />
      <Route path='leaderboard' element={<Leaderboard />} />
      <Route path='register' element={<Register />} />
      <Route path='register/ref/:referId' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='about' element={<About />} />
    </Route>
  )

)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes} />
)
