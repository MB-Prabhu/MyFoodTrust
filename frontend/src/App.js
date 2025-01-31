import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/AdminCompos/Dashboard';
import AllUser from './components/AdminCompos/AllUser';
import AllTrust from './components/AdminCompos/AllTrust';
import LoginPage from './components/LoginPage';
import TrustPage from './Trust/TrustPage';
import UserPage from './Users/UserPage';
import AdminPage from './components/AdminCompos/AdminPage';
import TrustLogin from './Trust/TrustLogin';
import UserLogin from './Users/UserLogin';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';
import Trust from './Trust/Trust';
import TrustProvider from './context/TrustProvider';
import Users from './Users/Users';
import UserProvider from './context/UserProvider';
import TrustProfile from './Trust/TrustProfile';
import './index.css'
import PageNotFound from './components/PageNotFound';
import Inbox from './Users/Inbox';
function App() {
  return (
    <Router future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
      <TrustProvider>
        <UserProvider>
          {/* <Navbar /> */}
         <Routes>
      <Route path="/" element={<LoginPage />} />
        
        <Route path="/user" element={<UserPage />} />
        <Route path="/userlogin" element={<UserLogin/>} />


        <Route path="/userhome" element={<ProtectedRoute requiredRole="user">
          <Users />
        </ProtectedRoute>} />

        <Route path="/notification" element={<ProtectedRoute requiredRole="user">
          <Inbox />
        </ProtectedRoute>} />

        <Route path="/trust" element={<TrustPage />} />
        <Route path="/trustlogin" element={<TrustLogin/>} />

        <Route path="/trusthome" element={<ProtectedRoute requiredRole="trust">
          <Trust />
        </ProtectedRoute>} />

        <Route path="/trustMainpage" element={<ProtectedRoute requiredRole="trust">
          <Trust/>
        </ProtectedRoute>} />

        <Route path="/Trustprofile" element={<ProtectedRoute requiredRole="trust">
          <TrustProfile />
        </ProtectedRoute>} />



        {/* admin login page does not protected */}
        <Route path="/admin" element={<AdminPage />} />
        
        {/* pages where the admin should be a loggedin user then only he can access these pages */}
        <Route path="/Home" element={<ProtectedRoute requiredRole="admin">
          <Dashboard />
        </ProtectedRoute>} />

        <Route path="/alluser" element={<ProtectedRoute requiredRole="admin">
          <AllUser/>
        </ProtectedRoute>} />

        <Route path="/alltrust" element={<ProtectedRoute requiredRole="admin">
          <AllTrust />
        </ProtectedRoute>}/>


     <Route path='*' element={<PageNotFound />}/>
      </Routes>

      </UserProvider>
      </TrustProvider>
    </Router>
  );
}

export default App;
