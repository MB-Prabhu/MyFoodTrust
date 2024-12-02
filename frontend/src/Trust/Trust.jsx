import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Button, outlinedInputClasses } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from '@mui/material';


const UserCard = ({ user }) => {
  const userCardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: "#ffffff",
    boxShadow: "5px 5px 5px #0000007d"
  };

  const avatarStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px',
  };

  const userInfoStyle = {
    flex: '1',
  };

  const nameStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0',
  };

  const emailStyle = {
    fontSize: '14px',
    color: '#666',
    margin: '5px 0 0',
  };

  let noProfileImage = "data:image/png;base64,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"

  return (
    <div style={userCardStyle}>
      <img
        src={user?.image?.url != "N/A" ? user?.image?.url : noProfileImage ||'/placeholder.svg'}
        alt={user.name}
        style={avatarStyle}
      />
      <div style={userInfoStyle}>
        <h2 style={nameStyle}>Name: {user.Name}</h2>
        <p style={emailStyle}>Email: {user.email}</p>
        <p style={emailStyle}>Phone: {user.phone}</p>
      </div>
    </div>
  );
};

const Inbox = ({ inboxMessages , setInboxMessages}) => {


  const inboxMessageStyle = {
    borderBottom: '1px solid #eee',
    padding: '10px 10px',
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginTop: "5px",
    backgroundColor: "#ffffff",
    boxShadow: "5px 5px 5px #0000007d"
  };

  const inboxSubjectStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const inboxSenderStyle = {
    color: '#666',
    fontSize: '14px',
  };

  const inboxSenderNameStyle = {
    fontSize: "16px",
    color: "gray"
  }

  const inboxSenderPhoneStyle = {
    fontSize: "16px",
    color: "gray"
  }
  
  let acceptOrder = async (id)=>{
   try{
    let {data} = await axios.post(`http://localhost:4000/api/trust/acceptfoodorder/${id}`, {} ,{
      withCredentials: true
  })

  let finalData = data?.data
  if(finalData){
     let remainingMessages = inboxMessages.filter(({_id})=> _id != finalData._id )
      setInboxMessages(remainingMessages)
  }
   }
   catch(err){
      console.log(err.response?.data?.msg)
   }
  }

  return (
    <>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>Inbox</h2>
      {inboxMessages.map(({_id, fromUserId, noOfPeople, veg, address, createdAt, senderPhoneNumber, senderName}) => (
        <div key={_id} style={inboxMessageStyle}>
          <p>User Name: <span style={inboxSenderNameStyle}>{senderName}</span></p>
          <p>Phone no: <span style={inboxSenderPhoneStyle}>{senderPhoneNumber}</span></p>
          <p>No Of People: <span style={inboxSenderPhoneStyle}>{noOfPeople}</span></p>
          <div >Type of food <span style={inboxSubjectStyle}>{veg ? "Veg" : "Non-Veg"}</span></div>
          <div>Address: <span style={inboxSenderStyle}>{address}</span></div>
          {/* <p>{address}</p> */}
            <Button 
            variant='contained'
             sx={{width: "30px", fontSize: "12px"}}
             onClick={()=> acceptOrder(_id)}
            >Accept</Button>
        </div>
      ))}
    </>
  );
};

const Trust = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inboxMessages, setInboxMessages] = useState([]);


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


  let getRegisteredOrders = async ()=>{
    setLoading(true)
   try{
    let {data} = await axios.get(`http://localhost:4000/api/trust/getfoodorder`, {
      withCredentials: true
    })
    
    let finalData = data?.data
    if(finalData.length>0){
      console.log(finalData)
      setInboxMessages(finalData)
    }
   }
   catch(err){
    console.log(err.response?.data?.message)
   }
   finally{
    setLoading(false)
   }
  }

  useEffect(()=>{
    getRegisteredOrders()
  }, [])

  const searchUser = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/trust/searchuser?search=${searchTerm}&page=${PageNo}`,
        {  withCredentials: true }
      );
      setUsers(data?.data);
      setHasNext(data?.data.length < dataLimitPerPage ?true: false)
    } catch (err) {
      console.log(err?.response?.data?.message)
      setError( err?.response?.data?.message || 'Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const flexContainerStyle = {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  };

  const searchContainerStyle = {
    flex: '2',
  };

  const inboxContainerStyle = {
    flex: '1',
    borderLeft: '1px solid #ccc',
    paddingLeft: '20px',
  };

  const inputStyle = {
    width: '65%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  };

  const userGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
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

  useEffect(()=>{
    searchUser()
  }, [PageNo])

  return (
    <div style={{backgroundColor: "#f5f5f5", height: "100vh"}}>
      <Navbar />
      <div style={containerStyle}>
        <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
          Welcome to Trust Page
        </h1>

        <div style={flexContainerStyle}>
          <div style={searchContainerStyle}>
            <div>
              <input
                type="text"
                placeholder="Search users Transaction ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={inputStyle}
              />
              <button onClick={searchUser} style={buttonStyle}>
                Search
              </button>
            </div>

            <div style={userGridStyle}>
              {loading && <p>Loading...</p>}
              {!loading && error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

              {!loading && !error && users.length && users.length>0 && users.map((user, index) => (
                <UserCard key={index} user={user}  />
              ))}
              {!loading && !error && users.length === 0 && !error && (
                <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
                  No users found. Try a different search term.
                </p>
              )}

                

            </div>
           {!loading && !error && <div style={paginationTrust} >
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
            </div>}
          </div>

          <div style={inboxContainerStyle}>
            <Inbox inboxMessages={inboxMessages} setInboxMessages={setInboxMessages}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trust;
