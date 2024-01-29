import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'  
import Home from './pages/user/fullTime/Home'
import Checkattendance from './pages/admin/Checkattendance';
import Admin from './pages/admin/Admin';
import Attendance from './pages/user/fullTime/Attendance';
import Report from './pages/user/fullTime/Report';
import RemotEmployeesHome from './pages/user/remot/RemotEmployeesHome';
import Profile from './pages/user/remot/Profile';
 const App = () => {
   return (
     <div>
      <Router> 
     
         <Routes>
          <Route exact path='/*' element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/login' element={<Login  />} />
          <Route path='/checkattendance' element={<Checkattendance  />} />
          <Route path='/attendance' element={<Attendance  />} />
          <Route path='/remot' element={<RemotEmployeesHome  />} />
          <Route path='/report' element={<Report  />} />
          <Route path='/r_profile' element={<Profile  />} />

        </Routes>
      </Router>
      </div>
   )
 }
 
 export default App