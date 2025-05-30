import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setEmails } from "../redux/appSlice";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const useGetAllEmails = async ()=>{
    const dispatch = useDispatch();
    const {emails} = useSelector(store => store.app);
    useEffect(()=>{
        const fetchEmails = async ()=>{
            try{
                const res = await axios.get(`${API_URL}/email/getAll`, {
                    withCredentials: true,
                });
                //console.log(res.data.emails);
                dispatch(setEmails(res.data.emails));
            }
            catch(err){
                console.error("Error fetching emails:", err);
            }
        }
        fetchEmails();
    }, [emails])
}

export default useGetAllEmails;