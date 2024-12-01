import React, { useContext, useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Bell, ChevronDown, Home, LayoutDashboard,HandHeart , LogOut, Menu, Settings, User, Rss } from 'lucide-react'
import './Dash.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TrustContext } from '../../context/TrustProvider';
import AdminNavbar from './AdminNavbar';
const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 100 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
]

const Dashboard = () => {

  let {getTotalTrust, getTotalUser, getTotalTransactions} = useContext(TrustContext)

//   useEffect(()=>{
//     getTotalTrust()
// },[])
  // console.log(getTotalTrust())
  const [sidebarOpen, setSidebarOpen] = useState(false)
  let navigate = useNavigate()

 let handleLogout = async ()=>{
  try{
    console.log("logut generate")
    let {data} = await axios.post("http://localhost:4000/api/admin/adminlogout", {}, {withCredentials: true})
    console.log(data)
    if(data.success){
      navigate('/')
    }
    else{
      alert("admin is not loggedin")
    }

    // WITHOUT AXIOS 
    //  let res = await fetch("http://localhost:4000/api/admin/adminlogout", 
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

let [totalTrust, setTotalTrust]= useState(0);
const [totalUser, setTotalUser] = useState(0)
const [totalTransactions, setTotalTransactions] = useState(0)



 useEffect(()=>{
    getTotalTrust().then(res=> {
      console.log(res)
      setTotalTrust(res)
    })

    getTotalTransactions().then(res=>{
        setTotalTransactions(res)
    })

    getTotalUser().then(res=>{
      setTotalUser(res)
    })
 }, [])

  return (
    <div className="dashboard">
      {/* Sidebar */}
      {/* <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
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
          <button className="nav-button"><User /> Profile</button>
          <button className="nav-button" onClick={()=>navigate("/set")}><Settings /> Settings</button>
          <button className="nav-button logout" onClick={()=> handleLogout()}><LogOut /> Logout</button>
        </nav>
      </aside> */}
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <button className="icon-button mobile-only" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>

         <div className='admin-title-nav'>
         <h1 className='admin-title'>Welcome, Admin</h1>
          <div className="header-actions">
            <input type="search" placeholder="Search..." className="search-input" />
            <button className="icon-button">
              <Bell />
            </button>
          </div>
         </div>
        </header>

        {/* Dashboard Content */}
        <main className="dashboard-content">
          <div className="card-grid">
            <div className="card">
              <div className="card-header">
                <h3>Total Trust</h3>
              </div>
              <div className="card-content">
                <div className="card-value">{totalTrust}</div>
                <p className="card-subtext">updated last month</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>Users</h3>
                <svg viewBox="0 0 24 24" className="card-icon">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="card-content">
                <div className="card-value">{totalUser}</div>
                <p className="card-subtext">Updated 2 minutes ago</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>Transaction</h3>
                <svg viewBox="0 0 24 24" className="card-icon">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </div>
              <div className="card-content">
                <div className="card-value">{totalTransactions}</div>
                <p className="card-subtext">Updated 2 minutes ago</p>
              </div>
            </div>
            {/* <div className="card">
              <div className="card-header">
                <h3>Active Users</h3>
                <svg viewBox="0 0 24 24" className="card-icon">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="card-content">
                <div className="card-value">5</div>
                <p className="card-subtext">+201 since last hour</p>
              </div>
            </div> */}
          </div>
          <div className="chart-activities-grid">
            <div className="card">
              <div className="card-header">
                <h3>Overview</h3>
              </div>
              <div className="card-content">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>History</h3>
              </div>
              <div className="card-content">
                <ul className="activity-list">
                  <li className="activity-item">
                    <span className="activity-indicator blue"></span>
                    <span className="activity-text">New user registered</span>
                    <span className="activity-time">5 min ago</span>
                  </li>
                  <li className="activity-item">
                    <span className="activity-indicator green"></span>
                    <span className="activity-text">Meeting with partners</span>
                    <span className="activity-time">1 hour ago</span>
                  </li>
                  <li className="activity-item">
                    <span className="activity-indicator yellow"></span>
                    <span className="activity-text">System update completed</span>
                    <span className="activity-time">2 hours ago</span>
                  </li>
                  <li className="activity-item">
                    <span className="activity-indicator red"></span>
                    <span className="activity-text">Server error reported</span>
                    <span className="activity-time">5 hours ago</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard