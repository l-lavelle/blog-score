

const AboutSite=()=>{

    return(
        <div className="footer-info">
        <h1>Welcome to BlogScore</h1>
        <h3>Our Mission</h3>
        <p>This website is your go-to platform for curated content that perfectly aligns with your interests! At the heart of our service is a powerful custom recommendation engine designed to understand and anticipate user preferences. Looking to keep you up to date on all things tech and get you inspired to learn and create innovative applications. Whether your new to tech, just starting out, or already a pro blog score has content for you!</p>
        <h3>Creation of this Site</h3>
        <p>This site began as a collaborative effort between full stack developers to create a user friendly and scablable application. Looking at backend of this site data is stored using the NoSQL database MongoDb and Mongoose an object data modeling library. GraphQL is query language used to get data from the database. Lastly authenication and authoirzation is setup using JSON (JWT) Web Tokens. The front end of the application is comprised of components written using React. If you are insterested in learning more about how the website was created check out the contact page for infomation!</p>
        </div>
    )
}
export default AboutSite