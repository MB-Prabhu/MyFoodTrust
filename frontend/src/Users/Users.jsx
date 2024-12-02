import React, { useContext, useEffect, useState } from 'react'
import {  Plus, Minus ,HandHeart,SendHorizontal,LogOut } from 'lucide-react'
import { IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';

import './User.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/UserProvider'
import Inbox from './Inbox'

import { Button, outlinedInputClasses } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { IconButton } from '@mui/material';


const Users = () => {
  let naviagte = useNavigate()

  let {getProfileData} = useContext(UserContext)

  const [profileData, setProfileData] = useState(null)
  const [trusts, setTrusts] = useState([])

  // getting the profile data
  useEffect(()=>{
    getProfileData().then(res=>{
      setProfileData(res)
    })
  }, [])

  

  // const [count, setCount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isVeg, setIsVeg] = useState(true)
  const [totalTrust, setTotalTrust] = useState(null)
  const [totalTrustLoading, setTotalTrustLoading] = useState(false)
  const [showInbox, setShowInbox] = useState(false)
  
  const [loading, setLoading] = useState(false)
  
  const [selectedTrust, setSelectedTrust] = useState([])
  const [createFoodDetail, setCreateFoodDetail] = useState({
    fromUserId: "",
    noOfPeople: 1,
    veg: true,
    preferred: [],
  })
  const [successfullCreated, setSuccessfullCreated] = useState(false)

  useEffect(()=>{
    setCreateFoodDetail({...createFoodDetail, 
      fromUserId: profileData?._id,
      noOfPeople: quantity,
      veg: isVeg,
      preferred: selectedTrust
    })
  }, [profileData, selectedTrust, quantity, isVeg])

  const [searchQuery, setSearchQuery] = useState('')
  // const incrementCount = () => {
  //   setCount(prevCount => prevCount + quantity)
  // }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10)
    setQuantity(isNaN(value) ? 0 : value)
  }

  const toggleVeg = () => {
    setIsVeg(prev => !prev)
  }

  let handleLogout = async () => {
    try {
      let { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/logoutuser`, {}, {
        withCredentials: true
      })
      if (data.msg) {
        naviagte('/')
      }
    }
    catch (err) {
      console.log(err?.response.data.message)
      console.log(err?.data?.msg)
    }
  }

  
  const [PageNo, setPageNo] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  let dataLimitPerPage = 10;

  let handlePageNo = (action)=>{
      if(action == "prev"){
        if(PageNo>1){
          setPageNo((p)=> p-1)
        }
      }

      if(action == "next"){
        setPageNo((p)=> p+1)
      }
  }



  // this function is to get the total trust present in the database
  let getTotalTrust = async ()=>{
    setTotalTrustLoading(true)
    try{
       let {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/getnooftrust`, {
          withCredentials: true
        })

        if(data?.data){
          setTotalTrust(data?.data)
    }
  }
    catch(err){
      console.log(err.response?.data?.msg)
    }
    finally{
      setTotalTrustLoading(false)
    }
  }
 

  useEffect(()=>{
    getTotalTrust()
  }, [])


  let handleSelectTrust = (id, {target: {checked}})=>{
    if(!selectedTrust.includes(id) && checked && selectedTrust.length<5){
      setSelectedTrust((prev)=> [...prev, id])
    }
    else if(selectedTrust.includes(id) && !checked){
      let removePreferedTrust = selectedTrust.filter(ele=> ele != id)
      setSelectedTrust(removePreferedTrust)
    }
  }

  let createFoodOrder = async ()=>{
    try{
      let {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/foodRegister`,
          createFoodDetail,    
      {
        withCredentials: true
      })
      if(data?.data){
        let resp = data?.data
        let foodstatus = data?.msg
        setSuccessfullCreated(foodstatus=="food created" ? true : false)
        setTimeout(() => {
          setSuccessfullCreated(false)
        }, 2000);
      }
    }
    catch(err){
      console.log(err.response?.data?.msg)
      console.log(err)
    }
    finally{
      setCreateFoodDetail({...createFoodDetail, preferred: [], noOfPeople: 0})
    }
  }

  let getTrust = async  ()=>{
    try{
  setLoading(true)
  let { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/searchtrust?search=`, {
    withCredentials: true
  })
  if(data?.data){
      setTrusts(data?.data)
      setLoading(false)
  } 
}
catch (err) {
  console.error(err.response?.data?.message || 'Error fetching trusts');
}
finally{
  setLoading(false)
}

  }


useEffect(() => {
  getTrust(); // Fetch all trusts by default
}, []);
  
const [searchError, setSearchError] = useState("")
const handleSearch = async () => {
  try {
    setLoading(true)
    let { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/searchtrust?search=${searchQuery}&page=${PageNo}`, {
      withCredentials: true,
    });
     if(data?.data){
       setSearchError("")
      setHasNext(data?.data.length < dataLimitPerPage ?true: false)
         setTrusts(data?.data)
     } 
  } catch (err) {
    console.log(err)
    if(err){
      setSearchError(err.response?.data?.message || 'Failed to fetch users. Please try again.')
    }
    console.log(err.response?.data?.message || 'Error fetching trusts');
  }
  finally{
    setLoading(false)
  }
};

const paginationTrust = {
  padding: "10px",
  // border: "2px solid red",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  margin: "10px 0"
}

const pageBtn = {
    borderRadius: "5px",
    backgroundColor: "#3182ce",
    padding: "2px",
    fontSize: "20px",
    display: "flex",
    justifyContent: "center",
    outline: "none",
    border: "none"
}

//  let noProfileImage = "data:image/png;base64,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"
let noTrustImage = "data:image/jpeg;base64,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"

let handleNotificationRedirect = ()=> {
  naviagte('/notification')
}

useEffect(()=>{
  handleSearch()
}, [PageNo])


  return (
    <div className="dashboard1">

      <header className="dashboard-header1">
        <h1>User Dashboard</h1>
        <div className="header-actions1">
        <input
          type="search"
          placeholder="Search Trust..."
          className="search-input1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
         }}
        />


        <IconButton onClick={handleSearch}>
        <SearchOutlinedIcon className='search-btn1' sx={{width: "35px", height: "35px"}} />
        </IconButton>

         <div onClick={handleNotificationRedirect}>
         <NotificationsIcon sx={{cursor: "pointer", bgcolor: "#efefer", borderRadius: "50%", width: "34px", height: "35px"}} />
         </div>
        {/* {!showInbox ? <NotificationsIcon sx={{cursor: "pointer", bgcolor: "#efefer", borderRadius: "50%", width: "34px", height: "35px"}} onClick={()=> setShowInbox(true)} />: <Inbox setShowInbox={setShowInbox}/>} */}
    
        <IconButton onClick={handleLogout} sx={{borderRadius: "5px", padding: "5px", fontSize: "20px", bgcolor: "#fd4545", color: "#363030", 
           "&:hover": {
            bgcolor: "#ee6060", // Hover state border color
          },
          }}>
          logout {"       "}
          <LogOut />
        </IconButton>

        </div>
      </header>
          
      <main className="dashboard-content1">
        <div className="card-container1">
          {/* Total Trust Card */}
          <div className="card1user">
            <div className="card-header1">
              <h2>Total Trust</h2>
              <HandHeart className="card-icon1" />
            </div>
            <div className="card-content">
              <div className="card-value1">{totalTrustLoading ?
              <div style={{fontSize: "16px"}}>loading</div>
              : totalTrust}</div>
              {/* <p className="card-subtext">Active Trust in the system</p> */}
              <p className='card-subtext1'>{successfullCreated ? "food order created" : null}</p>
            </div>
            <div className="quantity-control1">
              <label htmlFor="quantity" className="quantity-label1">Quantity:</label>
              <div className="quantity-input-wrapper1">
                <button className="quantity-button1" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
                  <Minus className="button-icon" />
                </button>
                <input
                  type="number"
                  id="quantity"
                  className="quantity-input1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
                <button className="quantity-button1" onClick={() => setQuantity(prev => prev + 1)}>
                  <Plus className="button-icon" />
                </button>
              </div>
            </div>
            <div className="toggle-control">
              <label htmlFor="veg-toggle" className="toggle-label1">
                {isVeg ? 'Veg' : 'Non-veg'}
                <div className={`toggle-switch1 ${isVeg ? 'veg' : 'non-veg'}`} onClick={toggleVeg}>
                  <input
                    type="checkbox"
                    id="veg-toggle"
                    checked={isVeg}
                    onChange={toggleVeg}
                    className="toggle-input1"
                  />
                  <button className="toggle-slider1">Switch</button>
                </div>
              </label>
            </div>
            <button className="increment-button1" onClick={createFoodOrder}>
              {/* <Plus className="button-icon" /> */}
              Send Food Availablity
              <SendHorizontal className="button-icon" />
            </button>
          </div>

         {/* All Trusts Card */}
<div className="card2user">
  <div className="card-header1">
    <h2>All Trusts</h2>
    <HandHeart className="card-icon" />
  </div>
  <div className="card-content">
{loading && <div style={{fontSize: "20px", textAlign: "center"}}>Loading..</div>}
{!loading && searchError && <div style={{fontSize: "20px", textAlign: "center"}}>{searchError}</div>}
 {!loading && !searchError && <ul className="trusts-list">
  {trusts.length > 0 && (
    trusts.map((trust, index) => (
      <li key={index} className="trust-item1">
        <img src={trust?.image?.url != "N/A" ? trust.image.url : noTrustImage} alt={trust.name} className="trust-image1" />
        <div className='user-detail1'>
        <h3 className="trust-name1">{trust.trustName}</h3>
        <p className='user-phone-title'>Phone: <span>{trust.trustPhoneNumber}</span></p>
        </div>
        {/* Add a checkbox here */}
        <input 
          type="checkbox" 
          id={`trust-checkbox-${index}`} 
          className="trust-checkbox1" 
          disabled={selectedTrust.length>3 && !selectedTrust.includes(trust._id)}
          onChange={(e)=> handleSelectTrust(trust._id, e)}
        />
      </li>
    ))
  )}
</ul> }
          </div>

{/* page */}

<div style={paginationTrust} >
                <button style={pageBtn}
                onClick={()=> handlePageNo('prev')}
                disabled={PageNo<2}> 
                  <ArrowBackIosIcon />
                 Prev
                </button>

                <button style={pageBtn} 
                onClick={()=> handlePageNo("next")}
                disabled={hasNext}
                >
                Next
                <ArrowForwardIosIcon />
                </button>
            </div>
</div>

        </div>
      </main>
      
    </div>
  )
}

export default Users