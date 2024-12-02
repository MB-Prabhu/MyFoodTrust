import React, { useState } from 'react'
import './Dash.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bell, ChevronDown, Home, LayoutDashboard,HandHeart , LogOut, Menu, Settings, User, Rss } from 'lucide-react'

const AdminNavbar = ({sidebarOpen, setSidebarOpen}) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false)

  let navigate = useNavigate()

  let handleLogout = async ()=>{
    try{
      let {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/adminlogout`, {}, {withCredentials: true})
      if(data.success){
        navigate('/')
      }
      else{
        alert("admin is not loggedin")
      }
  
      // WITHOUT AXIOS 
      //  let res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/adminlogout`, 
      //   {method: 'POSt',
      //     credentials: 'include'
      //   })
      //  res =  await res.json()
      //  console.log(res)
      // admintoken
    }
    catch(err){
      if(err.response){
        console.log(err.response.data.message)
      }
    }
   }


  return (
    <div>
         <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          <button className="icon-button mobile-only" onClick={() => setSidebarOpen(false)}>
            <ChevronDown />
          </button>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-button" onClick={()=>navigate("/Home")}><Home /> Home</button>
          <button className="nav-button" onClick={()=>navigate("/alluser")}><LayoutDashboard />User</button>
          <button className="nav-button" onClick={()=>navigate("/alltrust")}><HandHeart />Trust</button>
          {/* <button className="nav-button"><User /> Profile</button> */}
          {/* <button className="nav-button" onClick={()=>navigate("/set")}><Settings /> Settings</button> */}
          <button className="nav-button logout" onClick={()=> handleLogout()}><LogOut /> Logout</button>
        </nav>
      </aside>
    </div>
  )
}

export default AdminNavbar