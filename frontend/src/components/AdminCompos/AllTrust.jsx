import React, { useEffect, useState } from 'react'

import {  Menu} from 'lucide-react'
import './Dash.css';
import axios from 'axios';
import useGetAdm from './CustomHooks/useGetAdm';
import DisplaygetData from './DisplaygetData';
import InputSearch from './InputSearch';
import AdminNavbar from './AdminNavbar';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const AllTrust = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [searchValue, setSearchValue] = useState("")
    const [searchFinal, setSearchFinal] = useState("")
    const [searchedResult, setSearchedResult] = useState([])

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)



    
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


    
    let [apidata, setApidata] = useGetAdm(`${process.env.REACT_APP_API_URL}/api/admin/gettrusts/1/10`)


    let handleSearch = ()=>{
        setSearchFinal(searchValue)
    }


    let getSearchValue = async ()=>{
        try{
            setLoading(true)
            let {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/searchtrust?search=${searchFinal}&page=${PageNo}`,  {
                withCredentials: true
            })
            setHasNext(true)
            if(data && data?.data && data.data.length>0){
                setSearchedResult(data?.data)
                setHasNext(data?.data.length < dataLimitPerPage ? true: false)
                setLoading(false)
            }
            else{
                setErrorMessage(data?.data?.msg)
                setLoading(false)
            }
        }
        catch(err){
            console.log(err?.response.data?.message)
            setErrorMessage(err?.response.data?.message)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
       if(searchFinal){
        getSearchValue()
       }
       else{
        setSearchedResult([])
       }
    }, [searchFinal])

    useEffect(()=>{
        getSearchValue()
    }, [PageNo])

    useEffect(()=>{
       if(!searchFinal){
            setSearchedResult(apidata)
            setErrorMessage("")
       }
    }, [searchFinal, apidata, PageNo])

    const paginationTrust = {
        padding: "10px",
        // border: "2px solid red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px"
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
  
    
    return (
        <div className="dashboard">
            {/* Sidebar */}
            <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />

            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                <header className="header">
                    <button className="icon-button mobile-only" onClick={() => setSidebarOpen(true)}>
                        <Menu />
                    </button>

                    <div className='admin-title-nav'>
                    <h1 className='typeusers-admin-title'>All Trust</h1>
                    <div className="header-actions">
                        
                        <InputSearch searchValue={searchValue} setSearchValue={setSearchValue} />

                            {/* <button onClick={handleSearch}>search</button> */}
                            <IconButton onClick={handleSearch}>
                            <SearchOutlinedIcon className='search-btn1' sx={{width: "35px", height: "35px"}} />
                            </IconButton>
                        {/* <button className="icon-button">
                            <Bell />
                        </button> */}
                    </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="dashboard-content">
                    <div className="card-grid-people">

                        {loading && <div style={{fontSize: "24px", fontWeight: "600"}}>Loading Please wait</div>}
                        {!loading && errorMessage && <div style={{fontSize: "18px", fontWeight: "600"}}>{errorMessage}</div>}

                        {!loading && !errorMessage && searchedResult.length>0 && searchedResult.map(({trustName, _id, trustEmail, role, address, trustPhoneNumber, image}) => {
                            return (              
                            <DisplaygetData setSearchedResult={setSearchedResult} searchedResult={searchedResult}  key={_id} _id={_id} Name={trustName} email={trustEmail} address={address} role={role} image={image} phone={trustPhoneNumber} />
                            )
                        })
                        }

                    </div>
                    
                        
              {!errorMessage && !loading &&  searchedResult.length>0 && <div style={paginationTrust} >
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



                </main>
            </div>
        </div>
    )
}

export default AllTrust;