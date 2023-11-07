const mongoose = require("mongoose");
const db = require("../config/connection"); // Adjust the path as necessary for your project setup
const User = require("../models/User"); // Adjust the path to where your User model is defined

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
