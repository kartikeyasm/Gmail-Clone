import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { setOpen } from '../redux/appSlice';

function SendEmail() {
    const open = useSelector((store)=> store.app.open);
    const dispatch = useDispatch();
    return (
        <div className={`${open ? 'block': 'hidden'} bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}>
            <div className='flex items-center justify-between px-3 py-2 bg-[#F2F6FC]'>
                <h1>New Message</h1>
                <div onClick={()=>dispatch(setOpen(false))} className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                    <RxCross2 size="20px" />
                </div>
            </div>
            <form className='flex flex-col p-3 gap-2'>
                <input name="to" type="text" placeholder='To' className='outline-none py-1'/>
                <input name="subject" type="text" placeholder='Subject' className='outline-none py-1'/>
                <textarea name="message"  rows={'10'} cols={'30'} className='outline-none py-1'></textarea>
                <button type='submit' className='bg-blue-700 rounded-full px-5 py-1 w-fit text-white'>Send</button>
            </form>
        </div>
    )
}

export default SendEmail