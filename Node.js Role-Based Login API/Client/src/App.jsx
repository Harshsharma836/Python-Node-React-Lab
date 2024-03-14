import { useState } from 'react'
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import AdminPanel from './components/AdminPanel'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import UserPanel from './components/UserPanel'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' Component={LoginPage}></Route>
        <Route path='/register' Component={RegisterPage}></Route>
        <Route path='user' Component={UserPanel}></Route>
        <Route path='admin' Component={AdminPanel}></Route>
      </Routes>
    </Router>
  )
}

export default App
