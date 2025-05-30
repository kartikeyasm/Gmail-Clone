import React, { useEffect, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, setUser } from '../redux/appSlice';
import toast from 'react-hot-toast';
import axios from 'axios';


function Navbar() {
    const API_URL = import.meta.env.VITE_API_URL;
    const {user} = useSelector(store => store.app);
    const [searchMail, setSearchMail] = useState('');
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setSearchText(searchMail));
    }, [searchMail])

    const handleLogout = async ()=>{
        try{
            const res = await axios.get(`${API_URL}/user/logout`, {
                withCredentials: true
            });
            console.log("Logout response", res);
            toast.success("Logout successful");
            dispatch(setUser(null));
        }catch(err){
            console.error("Logout failed", err);
        }
    }


  return (
    <div className='flex items-center justify-between mx-3 h-16'>
        <div className='flex items-center gap-10'>
            <div className='flex items-center gap-2'>
                <div className='p-3 hover:bg-gray-200 rounded-full cursor-pointer'>
                    <RxHamburgerMenu />
                </div>
                <img className='w-35' src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r5.png" alt="logo" />
            </div>
        </div>
        
        <div className='w-[50%] mr-60'>
            <div className='flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full'>
                <IoIosSearch size={'24px'} className='text-gray-700' />
                <input 
                    onChange={(e) => setSearchMail(e.target.value)} 
                    value={searchMail}
                    type='text' 
                    placeholder='Search Mail'
                    className='rounded-full w-full bg-transparent outline-none px-1'
                />    
            </div>
        </div>
        <div className='flex items-center gap-2'>
            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                <CiCircleQuestion size={'24px'} />
            </div>
            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                <IoIosSettings size={'24px'} />
            </div>
            <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                <TbGridDots size={'24px'} />
            </div>
            <span className='underline cursor-pointer' onClick={handleLogout}>Logout</span>
            <img 
                src={user.avatar} 
                alt="User Avatar" 
                className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
        </div>
    </div>
  )
}

export default Navbar