import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { UpdateDataProvaider } from './assets/context/UpdateData'
import { Toaster } from 'sonner'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { DataUserProvider } from './assets/context/dataUser'
import { PrivateRoute } from './routes/PrivateRoute'

const Register = () => <div>Register</div>
const Dashboard = () => <div>Dashboard</div>

function App () {
  return (
    <Router>
      <Toaster richColors position='top-right' />
      <UpdateDataProvaider>
        <DataUserProvider>
          <Routes>
            <Route
              index path='/*' element={
                <PrivateRoute>
                  <LandingPage />
                </PrivateRoute>
            }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/registrer' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </DataUserProvider>
      </UpdateDataProvaider>
    </Router>
  )
}

export default App
