import axios from 'axios'
import React, { createContext } from 'react'

export const UserContext = createContext()
const UserProvider = ({children}) => {

    let getProfileData = async ()=>{
       let {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/getuserprofile`, {
        withCredentials: true
       })

       if(data?.data){
        let profileData = data?.data
        return profileData
       }
    }

    let value = {
        getProfileData
    }
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export default UserProvider