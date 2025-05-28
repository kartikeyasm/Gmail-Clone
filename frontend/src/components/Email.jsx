import React from 'react'
import { MdCropSquare } from 'react-icons/md'
import { MdOutlineStarBorder } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Email = () => {
    const navigate = useNavigate()
    const openMail = () => {
        navigate("/mail/123") // Replace '123' with the actual email ID or parameter you want to use
    }
    return (
        <div onClick={openMail} className='flex items-center justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md'>
            <div className='flex items-center gap-3'>
                <div className='text-gray-400'>
                    <MdCropSquare size={'20px'} />
                </div>
                <div className='text-gray-400'>
                    <MdOutlineStarBorder size={'20px'} />
                </div>
                <div>
                    <h1 className='font-semibold'>Email Subject</h1>
                </div>
            </div>
            <div className='flex-1 ml-4' >
                <p>Email Message</p>
            </div>
            <div className='flex-none text-gray text-sm'>
                <p>Email Sent At</p>
            </div>
        </div>
    )
}

export default Email
