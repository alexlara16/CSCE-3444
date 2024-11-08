/*// Separate models for clarity

mongoose.connect("mongodb://localhost:27017/Login")
    .then(() => {
        console.log("MongoDB connected for Login");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB for Login:", error); // This will log any connection issues
    });


const mongoose = require("mongoose");

// Login model
const LoginSchema = new mongoose.Schema({
    loginName: { type: String, required: true },
    loginEmail: { type: String, required: true, unique: true },
    loginPassword: { type: String, required: true }
});

const Login = mongoose.model("Login", LoginSchema);

// Post model
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Post = mongoose.model("Post", postSchema);

module.exports = { Login, Post };
*/

const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Login")
    .then(() => {
        console.log("MongoDB connected for Login");
    })
    .catch(() => {
        console.log("Failed to connect to MongoDB for Login");
    });

// Define the Login schema and model
const LoginSchema = new mongoose.Schema({
    loginName: {
        type: String,
        required: true
    },
    loginEmail: {
        type: String,
        required: true
    },
    loginPassword: {
        type: String,
        required: true
    }
});
const Login = mongoose.model("Login", LoginSchema);

// Define the Post schema and model
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Post = mongoose.model("Post", PostSchema);

// Export the models
module.exports = { Login, Post };
