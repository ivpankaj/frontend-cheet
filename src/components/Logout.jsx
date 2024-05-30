import React from 'react'
import '../Styles/Logout.css'
import { IoLogOut } from "react-icons/io5";
const Logout = () => {
    const handleLogout = () => {
        // Remove token from local storage
        localStorage.removeItem("token");
        // Redirect to login page or any other desired route
        window.location.href = "/"; // Redirect to login page
      };
  return (
  <>  <div className='logout'>
  <button onClick={handleLogout}><IoLogOut/></button>
  <pre>Logout</pre> 
</div>
<pre className='pre-fo'>Designed and Developed By Pankaj</pre>
  </>
    
  )
}

export default Logout
