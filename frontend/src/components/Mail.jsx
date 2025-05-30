import React from 'react'
import { IoMdArrowBack, IoMdMore } from 'react-icons/io'
import { BiArchiveIn } from "react-icons/bi";
import { MdDeleteOutline, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineAddTask, MdOutlineDriveFileMove, MdOutlineMarkEmailUnread, MdOutlineReport, MdOutlineWatchLater } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';


function Mail() {
    const navigate = useNavigate();
    const {openedMail} = useSelector(store => store.app);
    const API_URL = import.meta.env.VITE_API_URL;
    const deleteMail = async () => {
        try{
            const res = await axios.delete(`${API_URL}/email/delete/${openedMail._id}`, {
                withCredentials: true
            });
            toast.success("Mail deleted successfully");
            navigate("/");
        }catch(err) {
            console.error("Error deleting mail:", err);
            toast.error("Failed to delete mail");
        }
    }
    
  return (
    <div className='flex-1 bg-white rounded-xl mx-5'>
        <div className='flex items-center justify-between px-4'>
            <div className='flex items-center gap-2 text-gray-700 py-2'>
                <div onClick={() => navigate("/")} className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                    <IoMdArrowBack size={'20px'} />
                </div>
                <div className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                    <BiArchiveIn size={'20px'} />
                </div>
                <div className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                    <MdOutlineReport size={'20px'} />
                </div>
                <div onClick={deleteMail} className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                    <MdDeleteOutline size={'20px'} />
                </div>
                <div className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                    <MdOutlineMarkEmailUnread size={'20px'} />
                </div>
                <div className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                    <MdOutlineWatchLater size={'20px'} />
                </div>
                <div className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                    <MdOutlineAddTask size={'20px'} />
                </div>
                <div className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                    <MdOutlineDriveFileMove size={'20px'} />
                </div>
                <div className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                    <IoMdMore size={'20px'} />
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <span>1 to 50</span>
                <MdKeyboardArrowLeft size="24px" />
                <MdKeyboardArrowRight size="24px" />
            </div>
        </div>

        <div className='h-[90vh] overflow-y-auto p-4'>
            <div className='flex justify-between bg-white items-center gap-1'>
                <div className='flex items-center gap-2'>
                    <h1 className='text-xl font-medium'>{openedMail?.subject}</h1>
                    <span className='text-sm bg-gray-200 rounded-md px-2'>inbox</span>
                </div>
                <div className='flex-none text-gray-400 my-5 text-sm'>
                    <p>12 days ago</p>
                </div>
            </div>
            <div className='text-gray-500 text-sm'>
                <h1>{openedMail?.to}</h1>
                <span>to me</span>
            </div>
            <div className='my-10'>
                <p>{openedMail?.message}</p>
            </div>

        </div>

    </div>
  )
}

export default Mail