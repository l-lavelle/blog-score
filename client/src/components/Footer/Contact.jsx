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
            <p>We always love to hear from our users! Let us know your thoughts about the site, any suggestions for future features, or any problems you’re having. Contact us using the form below and we will reach out to you at email address provided as soon as possible.</p>
        
         
        
        <div >
           <form ref={form} onSubmit={sendEmail} className='d-flex flex-column'>
             <label >Name</label>
             <input className='mb-3' onChange={updateData} value={emailData.user_name} type="text" name="user_name" />
             <label >Email</label>
             <input className='mb-3' onChange={updateData} value={emailData.user_email} type="email" name="user_email" />
             <label >Message</label>
             <textarea className='mb-3' onChange={updateData} value={emailData.message} rows={12} name="message" />
              <div className='text-center'>
             <input style={{borderRadius: "10px", padding: '5px', background: "#14e956" , border: "black", color:"black"}} className="text-center ps-3 pe-3" type="submit" value="Send" />
             </div>
           </form>
           {message.status==='error'?<p className='text-center mt-3' style={{color:"red"}}>{message.message}</p>:null}
           {message.status==='success'?<p className='text-center mt-3' style={{color:"green"}}>{message.message}</p>:null}
        </div>
        </div>
         
        </>
    )
}

export default Contact 

