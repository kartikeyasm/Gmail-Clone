import React, { useEffect, useState } from 'react'
import Email from './Email'
import useGetAllEmails from '../hooks/useGetAllEmails'
import { useSelector } from 'react-redux';

const Emails = () => {
  useGetAllEmails();
  const {emails, searchText} = useSelector(store=> store.app);
  const [searchEmails, setSearchEmails] = useState(emails);

  useEffect(()=>{
    const filteredEmails = emails.filter(email => 
      email.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      email.message.toLowerCase().includes(searchText.toLowerCase()) ||
      email.to.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchEmails(filteredEmails);
  }, [emails, searchText]);

  return (
    <div>
      {
        searchEmails && searchEmails?.map((email)=>
            <Email key={email?._id} email = {email}/>
            )
      }
    </div>
  )
}

export default Emails
