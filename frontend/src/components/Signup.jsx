import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Signup() {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    
    const handleChange = (e)=>{
        setInput({...input, [e.target.name] : e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("Form submitted with data:", input);
        try{
            const res = await axios.post(`${API_URL}/user/signup`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if(res.data.success){
                setInput({
                    fullName: "",
                    email: "",
                    password: ""
                });
                navigate("/login");
                toast.success(res.data.message);
            }
            console.log("Signup response:", res.data);
        }catch(err){
            console.error("Error during signup:", err);
            toast.error(err.response?.data?.message || "An error occurred during signup");
        }
    }

    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 bg-white p-4 w-[20%]'>
                <h1 className='font-bold text-2xl uppercase my-2'>Signup</h1>
                <input onChange={handleChange} value={input.fullName} name='fullName' type='text' placeholder='Name' className='border border-gray-400 rounded-md px-2 py-1' />
                <input onChange={handleChange} value={input.email} name='email' type='email' placeholder='Email' className='border border-gray-400 rounded-md px-2 py-1' />
                <input onChange={handleChange} value={input.password} name='password' type='password' placeholder='Password' className='border border-gray-400 rounded-md px-2 py-1' />
                <button type="submit" className='bg-gray-800 p-2 text-white my-2 rounded-md'>Signup</button>
                <p>Already have an account? <Link to={"/login"} className='text-blue-600'>Login</Link></p>
            </form>
        </div>    
    )
}

export default Signup