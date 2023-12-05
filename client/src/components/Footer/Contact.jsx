// Need to fix layout but does work!! messages and clear message info
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact=()=>{
    const form = useRef();

         const sendEmail = (e) => {
           e.preventDefault(); // prevents the page from reloading when you hit “Send”
        
           emailjs.sendForm("service_il6b8zg", 'template_uigoji9', form.current, 'zhCenTCZqdBMtVbwy')
             .then((result) => {
                 // show the user a success message
             }, (error) => {
                 // show the user an error
             });
         };


    return(
        <>
        <div className="footer-info">
            <h1>Contact Us</h1>
            <p>We always love to here from you </p>
        </div>
         
        
        <div >
           <form ref={form} onSubmit={sendEmail} className='d-flex flex-column'>
             <label style={{color:"white"}}>Name</label>
             <input type="text" name="user_name" />
             <label style={{color:"white"}}>Email</label>
             <input type="email" name="user_email" />
             <label style={{color:"white"}}>Message</label>
             <textarea name="message" />
             <input type="submit" value="Send" />
           </form>
        </div>
         
        </>
    )
}

export default Contact 

