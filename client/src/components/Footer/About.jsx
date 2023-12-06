const AboutSite=()=>{

    return(
    <div className="footer-info">
        <h1 className="text-center">Welcome to BlogScore</h1>
        <h3>Our Mission</h3>
        <p>This website is your go-to platform for curated technology content that aligns with your interests! At the heart of our service is a custom recommendation engine designed to understand and anticipate your preferences. Looking to keep you up to date on all things tech, Blog Scores aims to inspire you to learn and create innovative applications. As well as give you the opportunity to share your thoughts with the Blog Score community. Whether you’re new to tech, just starting out, or already a pro, this is the place for you!</p>
        <h3>Creation of this Site</h3>
        <p>Hi my name is Lauren Lavelle the lead developer for Blog Score. This site began as a collaborative effort between full stack developers to create a user friendly and scalable application. We wanted a place where tech lovers could stay up to date on all the new things coming out. I wanted to continue building the site with more capabilities to create a great user experience. Continuing to try new skills and implement new technologies and libraries to build this site has taught me a lot and helped hone my skills. I hope all of you enjoy the platform and are excited to try something new! I know for me the best way to learn tech is through building something new. </p>
        <h3>Future Features</h3>
        <p>Stay tuned for future developments coming soon including:
        <li>Creating a network of friends: able to connect with other users and checkout their favorite blogs</li>
        <li>Pictures: All blog posts will have images embedded in the post. Your profile you will be able to add a profile picture or avatar to personalize your account. </li>
        </p>
        <h3>Technology Stack</h3>
        <p>Are curious to see what technologies were used to build this site? This application was created using the MERN (Mongo, Express, React, Node) stack. 
Looking at backend, data is stored using the NoSQL database MongoDb using Mongoose an object data modeling library to create model schemas. GraphQL, a query language, is used to get data from the database. Authentication and authorization is setup using JSON (JWT) Web Tokens. The front end of the application is comprised of components written using React. If you are interested in learning more about how the website was created check out <a className="contact-link" href="https://github.com/l-lavelle/blog-score">GitHub Page</a> to see all the code!
</p>
    </div>
    )
}
export default AboutSite