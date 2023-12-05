// Need to fix layout but does work!! messages and clear message info
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import  { useState } from 'react';
// import dotenv from 'dotenv'
// dotenv.config()

const Contact=()=>{
    const [message, setMesage]=useState({message:'', status:''});
    const [emailData, setEmailData] = useState({ message: '', user_email: '', user_name:''});
    // console.log("trial env",import.meta.env.VITE_SOME_KEY);
    // console.log("React env",import.meta.env.VITE_SOME_KEY);

    const updateData= async (event)=>{
        const { name, value } = event.target;
        setEmailData({ ...emailData, [name]: value });
      };

    const form = useRef();

         const sendEmail = (e) => {
            
           e.preventDefault(); // prevents the page from reloading when you hit “Send”
        
           emailjs.sendForm("service_il6b8zg", 'template_uigoji9', form.current, 'zhCenTCZqdBMtVbwy')
             .then((result) => {
                setMesage({message:'Email was sent', status:'success'})
                setEmailData({
                    message: '',
                    user_email: '',
                    user_name:''
                  })
             }, (error) => {
                setMesage({message:'Unable to send email', status:'error'})
             });
         };


    return(
        <>
        <div className="footer-info">
            <h1>Contact Us</h1>
            <p>We always love to here from our users! Feel free to contact us using the form below and we will get back to you as soon as possible.</p>
        </div>
         
        
        <div >
           <form ref={form} onSubmit={sendEmail} className='d-flex flex-column'>
             <label style={{color:"white"}}>Name</label>
             <input onChange={updateData} value={emailData.user_name} type="text" name="user_name" />
             <label style={{color:"white"}}>Email</label>
             <input onChange={updateData} value={emailData.user_email} type="email" name="user_email" />
             <label style={{color:"white"}}>Message</label>
             <textarea onChange={updateData} value={emailData.message} rows={12} name="message" />
             <input type="submit" value="Send" />
           </form>
           {message.status==='error'?<p className='text-center mt-3' style={{color:"red"}}>{message.message}</p>:null}
           {message.status==='success'?<p className='text-center mt-3' style={{color:"green"}}>{message.message}</p>:null}
        </div>
         
        </>
    )
}

export default Contact 

