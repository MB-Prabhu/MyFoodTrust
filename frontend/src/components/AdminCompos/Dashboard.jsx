import React, { useContext, useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { HandHeart , Menu,  } from 'lucide-react'
import './Dash.css';
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

  const [sidebarOpen, setSidebarOpen] = useState(false)


let [totalTrust, setTotalTrust]= useState(0);
const [totalUser, setTotalUser] = useState(0)
const [totalTransactions, setTotalTransactions] = useState(0)



 useEffect(()=>{
    getTotalTrust().then(res=> {
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
            {/* <button className="icon-button">
              <Bell />
            </button> */}
          </div>
         </div>
        </header>

        {/* Dashboard Content */}
        <main className="dashboard-content">
          <div className="card-grid">
            <div className="card">
              <div className="card-header">
                <h4>Total Trust</h4>
                <HandHeart />
              </div>
              <div className="card-content">
                <div className="card-value">{totalTrust}</div>
                <p className="card-subtext">No of trusts in application</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h4>Total Users</h4>
                <svg viewBox="0 0 24 24" className="card-icon">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="card-content">
                <div className="card-value">{totalUser}</div>
                <p className="card-subtext">No of users in application</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h4>Total Transaction</h4>
                <svg viewBox="0 0 24 24" className="card-icon">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </div>
              <div className="card-content">
                <div className="card-value">{totalTransactions}</div>
                <p className="card-subtext">successfull transactions</p>
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
            <div className="card-sub">
              <div className="card-header-sub">
                <h3>Overview</h3>
              </div>
              <div className="card-content-sub">
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
            <div className="card-sub">
              <div className="card-header-sub">
                <h3>History</h3>
              </div>
              <div className="card-content-sub">
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