const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Login")
    .then(() => {
        console.log("MongoDB connected for Login");
    })
    .catch(error => {
        console.error("Failed to connect to MongoDB for Login:", error);
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
        default: "" // Optional field; we'll use 'author' instead if not set
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


// Define the Tutor schema and model
const TutorSchema = new mongoose.Schema({
    name: String,
    subject: String,
    location: String,
    contact: String
});
const Tutor = mongoose.model("Tutor", TutorSchema);

///
//Define Contact Us Message Schema
const contactMessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);


// Export all models
module.exports = { Login, Post, Tutor, ContactMessage };
