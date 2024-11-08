const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const hbs = require("hbs");
//const Login = require("./loginModel"); // Import Login model
//const Post = require("./postModel");  // Import Post model
const { Login, Post } = require("./mongodb");


const app = express();
const templatePath = path.join(__dirname, '../Templates');

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());  // Add this to parse JSON data if needed
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"));

// Routes
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/forum", async (req, res) => {
    try {
        const posts = await Post.find();  // Retrieve posts from the database
        res.render("forum", { posts });
    } catch (error) {
        console.log("Error fetching posts:", error);
        res.status(500).send("Error loading posts");
    }
});

/*
// Handle signup
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send("All fields are required");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Login({ loginName: username, loginEmail: email, loginPassword: hashedPassword });
        await newUser.save();

        req.session.user = newUser; // Create a session for the user
        res.redirect("/");  // Redirect to the home page after signup
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Error signing up user");
    }
});
*/

// Route for the login page
app.get("/login", (req, res) => {
    res.render("login"); // Ensure 'login.hbs' exists in your views directory
});

// Route for the tutors page
app.get("/tutors", (req, res) => {
    res.render("tutors"); // Ensure 'tutors.hbs' exists or use an appropriate file
});



// Handle post submission
app.post("/forum", async (req, res) => {
    try {
        const { author, content } = req.body;
        if (!author || !content) return res.status(400).send("Both author and content are required");

        const newPost = new Post({ author, content, title: "User Post" });
        await newPost.save();
        
        res.redirect("/forum");
    } catch (error) {
        console.error("Error saving post:", error);
        res.status(500).send("Error saving post");
    }
});



app.post("/signup", async (req, res) => {
    console.log("Incoming signup data:", req.body); // Log incoming data to see what's sent from the client

    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Login({ loginName: username, loginEmail: email, loginPassword: hashedPassword });
        await newUser.save();

        //res.status(200).json({message: "Signup successful" });

        res.redirect("/"); // Redirect to home page, can change to '/' or any other page

    } catch (error) {
        console.error("Error during signup:", error); // This line prints the error details
        res.status(500).json({ error: "Error signing up user" });
    }
});



app.listen(3000, () => {
    console.log("Server running on port 3000");
});
