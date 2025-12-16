import { createBrowserRouter } from "react-router"
import { Home } from './pages/home'
import { Admin } from './pages/admin'
import { Login } from './pages/login'
import { Social } from './pages/social'
import { Private } from './routes/private'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }, {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: <Private><Admin /></Private>
  }, {
    path: '/admin/social',
    element: <Private><Social /></Private>
  }
])

export { router };