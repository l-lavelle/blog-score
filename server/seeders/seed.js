const mongoose = require("mongoose");
const db = require("../config/connection"); // Adjust the path as necessary for your project setup
const User = require("../models/User"); // Adjust the path to where your User model is defined
const Post = require("../models/Posts");

const userSeedData = [
  {
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith",
    password: "password127",
    friends: [],
  },

  {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    // Assuming password would be hashed during the User creation process
    password: "password126",
    friends: [], // This will be an array of references to other User documents
  },
  {
    firstName: "Sean",
    lastName: "Connor",
    username: "Redbull-boi",
    password: "password123",
    friends: [],
  },

  {
    firstName: "Alex",
    lastName: "Tester",
    username: "Horahed-2-hard",

    password: "password124",
    friends: [],
  },
  {
    firstName: "Scott",
    lastName: "Keller",
    username: "Tonga-till-u-bl33d",
    password: "password125",
    friends: [],
  },
  {
    firstName: "Matt",
    lastName: "Hamilton",
    username: "Zucced-a-apple",
    password: "password125",
    friends: [],
  },
  {
    firstName: "Lauren",
    lastName: "Lavelle",
    username: "Cat-lady-withthe-cats",

    password: "password8940",
    friends: [],
  },
];

const postSeedData = [
  {
    postTitle: "First Post Title",
    postText: "This is the content of the first post.",
    pictureLink: "http://example.com/image.jpg",
//  author: someUserId,
    postComments: [], 
    tags: ["tag1", "tag2"],
    likes: 0,
    createdAt: new Date() // or Date.now()
  },
  {
    postId: 1,
    postTitle: "The Evolution of Cybersecurity in the Age of Cloud Computing",
    postText: "As businesses migrate to the cloud, the role of cybersecurity has never been more critical. The shift away from traditional on-premises systems to cloud-based infrastructure brings a new set of challenges and vulnerabilities. Cybersecurity strategies must now encompass not just direct attacks but also the integrity of data in transit and at rest. Advanced encryption methods, multi-factor authentication, and continuous monitoring are part of a multi-layered defense approach that organizations are adopting. The emergence of cloud-native security platforms, which integrate seamlessly with cloud services and applications, is a testament to the evolving landscape. These platforms offer real-time threat detection and automated response mechanisms, ensuring that security scales with the expanding cloud footprint.",
    pictureLink: "http://example.com/image1.jpg",
    // author: someUserId,
    postComments: [],
    tags: ["Cybersecurity", "Cloud Computing", "Encryption", "Data Security", "Threat Detection"],
    likes: 0,
    createdAt: new Date()
  },
  {
    postId: 2,
    postTitle: "Blockchain Beyond Cryptocurrencies: A New Era of Decentralization",
    postText: "Blockchain technology, the backbone of cryptocurrencies, is branching out into numerous industries. Its potential for creating secure, decentralized records of transactions leads to innovative applications beyond digital currencies. Supply chain management, for instance, benefits from blockchain's ability to track the provenance of goods in a transparent and immutable ledger. In finance, smart contracts automate and enforce agreements without intermediaries, reducing fraud and streamlining processes. The technology's impact on data integrity and security is also significant, offering a robust solution to data breaches and unauthorized access. As blockchain continues to mature, its role in establishing trust in digital interactions becomes increasingly apparent, heralding a new era of internet reliability and business transparency.",
    pictureLink: "http://example.com/image2.jpg",
    // author: someUserId,
    postComments: [],
    tags: ["Blockchain", "Decentralization", "Smart Contracts", "Supply Chain", "Data Integrity"],
    likes: 0,
    createdAt: new Date()
  },
  {
    postId: 3,
    postTitle: "The Future of Internet of Things: Smart Cities and Beyond",
    postText: "The Internet of Things (IoT) is transforming our urban landscapes into smart cities, making them more efficient and sustainable. IoT devices collect data that can be used to manage assets, resources, and services more effectively. This includes everything from monitoring traffic patterns to reduce congestion, to smart energy grids that optimize power use. The potential benefits are enormous, including improved city services, reduced environmental footprint, and enhanced public transportation systems. However, this interconnectedness also raises significant privacy and security concerns that must be addressed to ensure the trust and safety of citizens.",
    pictureLink: "http://example.com/image3.jpg",
    // author: someUserId,
    postComments: [],
    tags: ["IoT", "Smart Cities", "Sustainability", "Urban Development", "Privacy", "Security"],
    likes: 0,
    createdAt: new Date()
  },
  {
    postId: 4,
    postTitle: "Big Data Analytics: Transforming Industries with Data-Driven Decisions",
    postText: "Big data analytics is revolutionizing industries by turning vast amounts of data into actionable insights. Companies are leveraging data analytics to drive decision-making, optimize operations, and personalize customer experiences. Retailers are predicting trends and managing inventory more effectively, while healthcare providers are improving patient care through predictive analytics. As big data technologies continue to advance, their potential to transform businesses grows exponentially. However, with this power comes the responsibility to protect user privacy and ensure ethical use of data.",
    pictureLink: "http://example.com/image4.jpg",
    // author: someUserId,
    postComments: [],
    tags: ["Big Data", "Analytics", "Data-Driven", "Predictive Analytics", "Privacy", "Ethical Use"],
    likes: 0,
    createdAt: new Date()
  },
  {
    postId: 5,
    postTitle: "The Rise of Quantum Computing and Its Potential Impacts",
    postText: "Quantum computing is on the brink of reshaping the technological world by offering immense computational power. This emerging field promises to solve complex problems that are currently beyond the reach of classical computers. Potential applications are vast, including drug discovery through molecular modeling, optimizing logistics, and even cracking encryption algorithms that secure our digital communications. As quantum computing continues to develop, it will be crucial to understand its implications for cybersecurity and to develop new standards to safeguard digital infrastructure.",
    pictureLink: "http://example.com/image5.jpg",
    // author: someUserId,
    postComments: [],
    tags: ["Quantum Computing", "Computational Power", "Drug Discovery", "Logistics", "Cybersecurity"],
    likes: 0,
    createdAt: new Date()
  },
  {
    postId: 3,
    postTitle: "The Future of Internet of Things: Smart Cities and Beyond",
    postText: "The Internet of Things (IoT) is transforming our urban landscapes into smart cities, making them more efficient and sustainable. IoT devices collect data that can be used to manage assets, resources, and services more effectively. This includes everything from monitoring traffic patterns to reduce congestion, to smart energy grids that optimize power use. The potential benefits are enormous, including improved city services, reduced environmental footprint, and enhanced public transportation systems. However, this interconnectedness also raises significant privacy and security concerns that must be addressed to ensure the trust and safety of citizens.",
    pictureLink: "http://example.com/image3.jpg",
    // author: someUserId,
    postComments: [],
    tags: ["IoT", "Smart Cities", "Sustainability", "Urban Development", "Privacy", "Security"],
    likes: 0,
    createdAt: new Date()
  },
  {
    postId: 4,
    postTitle: "Big Data Analytics: Transforming Industries with Data-Driven Decisions",
    postText: "Big data analytics is revolutionizing industries by turning vast amounts of data into actionable insights. Companies are leveraging data analytics to drive decision-making, optimize operations, and personalize customer experiences. Retailers are predicting trends and managing inventory more effectively, while healthcare providers are improving patient care through predictive analytics. As big data technologies continue to advance, their potential to transform businesses grows exponentially. However, with this power comes the responsibility to protect user privacy and ensure ethical use of data.",
    pictureLink: "http://example.com/image4.jpg",
    // author: someUserId,
    postComments: [],
    tags: ["Big Data", "Analytics", "Data-Driven", "Predictive Analytics", "Privacy", "Ethical Use"],
    likes: 0,
    createdAt: new Date()
  },
  {
    postId: 5,
    postTitle: "The Rise of Quantum Computing and Its Potential Impacts",
    postText: "Quantum computing is on the brink of reshaping the technological world by offering immense computational power. This emerging field promises to solve complex problems that are currently beyond the reach of classical computers. Potential applications are vast, including drug discovery through molecular modeling, optimizing logistics, and even cracking encryption algorithms that secure our digital communications. As quantum computing continues to develop, it will be crucial to understand its implications for cybersecurity and to develop new standards to safeguard digital infrastructure.",
    pictureLink: "http://example.com/image5.jpg",
    // author: someUserId,
    postComments: [],
    tags: ["Quantum Computing", "Computational Power", "Drug Discovery", "Logistics", "Cybersecurity"],
    likes: 0,
    createdAt: new Date()
  },
  {
    postId: 6,
    postTitle: "Augmented Reality in Education: A Tool for Enhanced Learning",
    postText: "Augmented Reality (AR) is revolutionizing the educational landscape by providing immersive learning experiences. AR applications in education extend beyond the classroom walls, allowing students to visualize complex concepts and engage with learning materials in interactive ways. From dissecting virtual frogs in biology class to exploring ancient civilizations in history lessons, AR brings a new dimension to education. It caters to various learning styles and can significantly enhance retention and understanding. As AR technology becomes more accessible, it has the potential to democratize education, making experiential learning available to a broader audience.",
    pictureLink: "http://example.com/image6.jpg",
    // author: someUserId,
    postComments: [],
    tags: ["Augmented Reality", "Education", "Immersive Learning", "Interactive", "Experiential Learning"],
    likes: 0,
    createdAt: new Date()
  },
  {
    postId: 7,
    postTitle: "The Role of 5G in Enabling the Next Generation of Connectivity",
    postText: "The deployment of 5G networks is set to unleash a new wave of digital transformation. With its ultra-low latency, unprecedented speed, and massive capacity, 5G is the cornerstone for the future of connectivity. It enables the proliferation of IoT, supports the growth of smart cities, and promises to enhance the capabilities of autonomous vehicles. Moreover, 5G is poised to revolutionize industries by enabling new services such as remote surgery in healthcare and real-time data analytics in manufacturing. As 5G networks roll out globally, they will create new opportunities for innovation, but also challenge current regulatory frameworks and raise questions about spectrum management and security.",
    pictureLink: "http://example.com/image7.jpg",
    // author: someUserId,
    postComments: [],
    tags: ["5G", "Connectivity", "IoT", "Smart Cities", "Autonomous Vehicles", "Digital Transformation"],
    likes: 0,
    createdAt: new Date()
  },
  {
    postId: 8,
    postTitle: "Sustainable Tech: How Green Technologies Are Shaping the Future",
    postText: "Sustainable technology is becoming increasingly important as the world grapples with climate change and environmental degradation. Green technologies, such as renewable energy systems, electric vehicles, and energy-efficient appliances, are leading the charge towards a more sustainable future. These technologies not only help reduce the carbon footprint but also offer economic benefits by decreasing energy costs and creating green jobs. The tech industry is also focusing on sustainable practices by minimizing e-waste and promoting recycling and upcycling of electronic devices. As consumers become more environmentally conscious, the demand for sustainable tech is expected to grow, driving further innovation in this sector.",
    pictureLink: "http://example.com/image8.jpg",
    // author: someUserId,
    postComments: [],
    tags: ["Sustainable Technology", "Green Tech", "Renewable Energy", "Electric Vehicles", "Climate Change"],
    likes: 0,
    createdAt: new Date()
  },
  {
    postId: 9,
    postTitle: "The Intersection of Healthcare and Tech: Telemedicine's Expansion",
    postText: "The intersection of healthcare and technology has paved the way for telemedicine, a field that has experienced exponential growth in recent years. Telemedicine leverages digital communication tools to provide clinical services to patients without an in-person visit. This approach to healthcare is particularly beneficial for rural and underserved communities, where access to care can be limited. The use of telemedicine has been shown to improve health outcomes by increasing access to care and enabling timely treatment interventions. As technology advances, the potential for telemedicine to include more sophisticated diagnostic and treatment options grows, further transforming the landscape of healthcare delivery.",
    pictureLink: "http://example.com/image9.jpg",
    // author: someUserId,
    postComments: [],
    tags: ["Healthcare", "Technology", "Telemedicine", "Digital Health", "Patient Care"],
    likes: 0,
    createdAt: new Date()
  },
  {
    postId: 10,
    postTitle: "Artificial Intelligence in Creative Industries: A New Frontier",
    postText: "Artificial intelligence (AI) is not only transforming traditional sectors but also making significant strides in the creative industries. From AI-generated music to algorithm-driven literature and artworks, the influence of AI on creativity is undeniable. These technologies are not replacing human creativity but rather augmenting it, providing artists with new tools and possibilities. AI can analyze vast amounts of data to identify patterns and generate new pieces, pushing the boundaries of what is possible in art and design. As AI continues to evolve, it will be fascinating to see how it reshapes the creative process and the types of art and entertainment we value.",
    pictureLink: "http://example.com/image10.jpg",
    // author: someUserId,
    postComments: [],
    tags: ["Artificial Intelligence", "Creativity", "Music", "Literature", "Art", "Design"],
    likes: 0,
    createdAt: new Date()
  },
  {
    postId: 11,
    postTitle: "The Digital Transformation of Education: Beyond the Classroom",
    postText: "The digital transformation of education extends beyond the integration of technology into the classroom; it's about rethinking the entire educational model. E-learning platforms, digital textbooks, and online resources have made education more accessible than ever before. The recent shift to remote learning has accelerated this transformation, highlighting the importance of digital literacy and self-paced learning. This shift also presents challenges, such as ensuring equitable access to technology and maintaining student engagement. As we navigate this new era of education, the focus must be on creating inclusive digital solutions that enhance learning for students of all backgrounds.",
    pictureLink: "http://example.com/image11.jpg",
    // author: someUserId,
    postComments: [],
    tags: ["Digital Transformation", "Education", "E-learning", "Remote Learning", "Digital Literacy"],
    likes: 0,
    createdAt: new Date()
  },
        
  // ... more posts
];

const seedDB = async () => {
  try {
    // Check if we have an active connection
    if (mongoose.connection.readyState === 0) {
      // No active connection, so connect
      await mongoose.connect(
        process.env.MONGODB_URI || "your-mongodb-connection-string",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
    } else if (mongoose.connection.readyState === 1) {
      // Connection is already open, use it
      console.log("Using the existing database connection.");
    }

    await User.deleteMany({});
    await User.collection.insertMany(userSeedData);
    await Post.deleteMany({});
    await Post.collection.insertMany(postSeedData);
    
    console.log("Post seed data inserted!");
    console.log("User seed data inserted!");
  } catch (err) {
    console.error("Failed to seed database:", err);
  } finally {
    // If we opened the connection, close it
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("Database connection closed.");
    }
    process.exit(0);
  }
};

seedDB();
