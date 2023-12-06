import { Link } from 'react-router-dom';
import './Footer.css'; 
const Guidelines=()=>{

    return(
        <div className="footer-info">
            <h1>Community Guidelines</h1>
            <p>
                We are so excited for you to join the blog score community! We encourage you to read through and interact with posts! Help us build a community where people can find content that elevates the platform and respects all of its members. To help everyone have the best possible experience, please take a look at our community guidelines:
            </p>
            <p>Encouraged Blog Site Usage:
                <li>Use of constructive and kind language </li> 
                <li>Post questions and start discussions relevant to blog post information</li>
                <li>If you see any content not following the below guidelines <Link to="/contact" className="contact-link">Contact Us</Link> and we will review</li>
            </p>
            <p>Restrictions:
                <li>Spam</li>
                <li>Irrvelant comments</li>
                <li>Threatening, defamatory, obscene, or profane comments</li>
                <li>Any comments that are deemed offense</li> 
                We thank you in advance for refraining from performing any of the following. If there are comments that do not follow the rules, the owner of this blog reserves the right to edit or delete any comments submitted to the blog without notice. 
            </p>
        </div>
    )
}

export default Guidelines