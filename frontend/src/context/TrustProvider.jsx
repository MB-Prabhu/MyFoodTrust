import axios from 'axios'
import React, { createContext } from 'react'

export const TrustContext = createContext()

const TrustProvider = (props) => {
    let getTotalTrust = async ()=>{
       try{
        let {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/getnooftrusts`, {
            withCredentials: true
        })

        let totalNoOfTrust = data?.data
        if(totalNoOfTrust || totalNoOfTrust==0){
            return totalNoOfTrust
        }
       }
       catch(err){
        console.log(err.response?.message)
        console.log(err.response?.data)
       }
    }

    let getTotalTransactions = async ()=>{
        try{
            let {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/getnooftransactions`, {
                withCredentials: true
            })
            let totalTransactions = data?.data
            return totalTransactions
        }
        catch(err){
            console.log(err.response?.data.msg)
            console.log(err.response?.data)
        }
    }

    let getTotalUser = async ()=>{
        try{
            let {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/getnoofusers`, {
                withCredentials: true
            })
            let totalTransactions = data?.data
            return totalTransactions
        }
        catch(err){
            console.log(err.response?.data.msg)
            console.log(err.response?.data)
        }
    }
    

    let value={getTotalTrust, getTotalUser, getTotalTransactions}
  return (
   <TrustContext.Provider value={value} >
        {props.children}
   </TrustContext.Provider>
  )
}

export default TrustProvider