import { Container, Row, Col } from 'react-bootstrap';
import MERN from '../../assets/MERNStack.png'
import GraphQL from '../../assets/GraphQL_Logo.svg.png'
import JWT from '../../assets/JWTtoken.png'
import './About.css'
const AboutSite=()=>{

    return(
    <div className="footer-info">
        <h1 className="text-center">Welcome to BlogScore</h1>
        <h3>Our Mission</h3>
        <p>This website is your go-to platform for curated technology content that aligns with your interests! At the heart of our service is a custom recommendation engine designed to understand and anticipate your preferences. Looking to keep you up to date on all things tech, Blog Scores aims to inspire you to learn and create innovative applications. As well as give you the opportunity to share your thoughts with the Blog Score community and learn from other users. Whether you’re new to tech, just starting out, or already a pro, this is the place for you!</p>
        <h3>How to Use</h3>
        <Container className='mt-3'> 
           <Row xs={12}>
           <Col className="d-flex flex-column align-items-center col-border" xs={12} md={3} lg={3}>
           <h5>Home</h5>
           <p className='tabs-info'>Check out posts from content creators. As you like posts the recommendation enigne will make suggestions for you putting them towards the top.</p>
           </Col>
           <Col className="d-flex flex-column align-items-center col-border" xs={12} md={3} lg={3}>
           <h5>Recent</h5>
           <p>All of the newest posts written by both content creators and users.</p>
           </Col>
           <Col className="d-flex flex-column align-items-center col-border" xs={12} md={3} lg={3}>
           <h5>Feed</h5>
           <p>All posts created by users you follow. Follow users who post content you find intersting to keep up to date with them. </p>
           </Col>
           <Col className="d-flex flex-column align-items-center col-border" xs={12} md={3} lg={3}>
           <h5>Favorites</h5>
           <p>Any post that you like will appear in your favorites tab for easy access you you and find and share with friends later.</p>
           </Col>
           </Row>
        </Container>
        <h3 className='mt-3'>Creation of this Site</h3>
        <p>Hi my name is Lauren Lavelle the lead developer for Blog Score. This site began as a collaborative effort between full stack developers to create a user friendly and scalable application. We wanted a place where tech lovers could stay up to date on all the new things coming out. I wanted to continue building the site with more capabilities to create a great user experience. Continuing to try new skills and implement new technologies and libraries to build this site has taught me a lot and helped hone my skills. I hope all of you enjoy the platform and are excited to try something new! I know for me the best way to learn tech is through building something new. </p>
        {/* <h3>Future Features</h3>
        <p>Stay tuned for future developments coming soon including:
        <li>Creating a network of friends: able to connect with other users and checkout their favorite blogs</li>
        <li>Pictures: All blog posts will have images embedded in the post. Your profile you will be able to add a profile picture or avatar to personalize your account. </li>
        </p> */}
        <h3>Technology Stack</h3>
        <p>Are curious to see what technologies were used to build this site? If you are interested in learning more about how the website was created check out <a className="contact-link" href="https://github.com/l-lavelle/blog-score">GitHub Page</a> to see all the code!
        <Container className='mt-3'> 
           <Row xs={12}>
           <Col className="d-flex flex-column align-items-center" xs={12} md={4} lg={4}>
           <img className="TechImg-small mb-3"src={MERN}/>
           <div className='mb-3'>
           <li className='techList'>M- MongoDB: NoSQL Database </li>
           <li className='techList'>E- Express: Node.js Web Framework</li>
           <li className='techList'>R- React: Library Building UI Components</li>
           <li className='techList'>N- Node: JavaScript Runtime Environment </li>
           </div>
           </Col>
           <Col xs={12} md={4} lg={4} className='mb-3'>
           <img className="TechImg mb-3" src={GraphQL}/>
           <p className='text-center'>GraphQL a query language for APIs allowing you to get back only data you need</p>
           </Col>
           <Col xs={12} md={4} lg={4} className='mb-3'>
           <img className="TechImg-small mb-3" src={JWT}/>
           <p className='text-center'>JSON Web Tokens used for authentication and authorization</p>
           </Col>
           </Row>
        </Container>
        </p>
    </div>
    )
}
export default AboutSite