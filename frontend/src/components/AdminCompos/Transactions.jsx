import axios from 'axios'
import React, { useState } from 'react'

const Transactions = () => {
    const [successfulltransactions, setSuccessfulltransactions] = useState([])
    // dummyData = {
    // fromUserId: 9876nbk5432345m678(userId),
    // noOfPeople: 5,
    // address: "srinsfjsj;",
    // veg: boolean,
    // prefereeed: [],
    // acceptedby: trustId,
    // createdAt: time stamp
// }
    let getSuccessfulltransactions = async ()=>{
        let {data} = await axios.get('http://localhost:4000/api/admin/transactions/1/10', {
            withCredentials: true
        })
        
        if(data?.data){
            setSuccessfulltransactions(data?.data)
        }
    // console.log(data?.data)
    
    }

  return (
    <div>
            <div>

            </div>
    </div>
  )
}

export default Transactions