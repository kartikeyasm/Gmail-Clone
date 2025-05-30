import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { setOpen } from '../redux/appSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

function SendEmail() {
    const open = useSelector((store)=> store.app.open);
    const dispatch = useDispatch();
    const API_URL = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = React.useState({
        to: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post(`${API_URL}/email/create`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            if(res.status === 200){
                toast.success("Email sent successfully");
            }
        }catch(err){
            console.error("Error sending email:", err);
            toast.error(err.response?.data?.message || "Failed to send email");
        }
        
        dispatch(setOpen(false));
        setFormData({
            to: "",
            subject: "",
            message: ""
        });
    }

    return (
        <div className={`${open ? 'block': 'hidden'} bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}>
            <div className='flex items-center justify-between px-3 py-2 bg-[#F2F6FC]'>
                <h1>New Message</h1>
                <div onClick={()=>dispatch(setOpen(false))} className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                    <RxCross2 size="20px" />
                </div>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col p-3 gap-2'>
                <input onChange={handleChange} value={formData.to} name="to" type="text" placeholder='To' className='outline-none py-1'/>
                <input onChange={handleChange} value={formData.subject} name="subject" type="text" placeholder='Subject' className='outline-none py-1'/>
                <textarea onChange={handleChange} value={formData.message} name="message"  rows={'10'} cols={'30'} className='outline-none py-1'></textarea>
                <button type='submit' className='bg-blue-700 rounded-full px-5 py-1 w-fit text-white'>Send</button>
            </form>
        </div>
    )
}

export default SendEmail