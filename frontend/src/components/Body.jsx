import React from 'react'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function Body() {
  const {user} = useSelector(store => store.app);
  const navigete = useNavigate();
  useEffect(()=>{
    if(!user){
      navigete('/login');
    }
  }, [user])
  return (
    <div className='flex'>
        <Sidebar/>
        <Outlet/>   
    </div>  
  )
}

export default Body