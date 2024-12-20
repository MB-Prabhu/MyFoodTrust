import axios from 'axios'
import styles from './Notifications.module.css';

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Inbox = () => {

    const navigate = useNavigate()

    let [notifications, setNotifications] = useState([])
    let [loading, setLoading] = useState(false)
    
    let getNotification = async()=>{
        setLoading(true)
        try{
            let {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/getnotification`, {
                withCredentials: true
            })
    
            let finalData = data?.data
            if(finalData){
                setNotifications(finalData)
                setLoading(false)
                
            }
    }
        catch(err){
            console.log(err.response?.data?.msg)
        }
    }

    useEffect(()=>{
        getNotification()
    }, [])

    let handleRedirect = ()=>{
        navigate('/userhome')
    }

   
  return (
    <div className={styles.mainContainer}>
        <nav className={styles.header}>
               <div >
               <h1>Notifications</h1>
                <ul>
                    <li onClick={handleRedirect}>User Dashboard</li>
                </ul>
               </div>
        </nav>

       {!loading && !notifications.length>0 && <h1 className={styles.notificaitonTitle}>Notifications</h1> }

    {loading && <div className={styles.loadingFallback}>Loading...</div>}
        
        <div className={styles.subContainersupport}>
        <div className={styles.subContainer}>
            {!loading && notifications && notifications.length>0 && notifications.map(({acceptedTrustName, acceptedTrustPhoneNumber, _id, veg, noOfPeople})=>(
                <div key={_id} className={styles.notificationCard}>
                        <p className={styles.orderid}>Order id: <span style={{fontSize: "14px"}}>{_id}</span></p>
                        <div className={styles.userdetails}>
                        <p className={styles.veg}>Food Type: <span>{veg ? "veg" : "non-veg"}</span></p>
                        <p className={styles.noofpeople}>No Of People: <span style={{color: "#000"}}>{noOfPeople}</span></p>
                        </div>
                        <div className={styles.trustdetails}>
                        <p className={styles.acceptedBy}>Accepted by: <span style={{color: "#000"}}>{acceptedTrustName}</span></p>
                        <p className={styles.trustPhone}>Trust Phone No: <span style={{color: "#000"}}>{acceptedTrustPhoneNumber}</span></p>
                        </div>
                </div>
            ))
        }
           {!loading && !notifications.length>0 && <div style={{fontSize: "22px", fontWeight: "500", marginTop: "40px"}} >no notifications so far...</div>
        }  
    </div>
        </div>
    </div>
  )
}

export default Inbox