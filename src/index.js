const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session"); // Import express-session
const { Login, Post, Tutor, ContactMessage} = require("./mongodb");

const app = express();
const templatePath = path.join(__dirname, "../Templates");

const crypto = require('crypto');

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", templatePath);

// Session setup
app.use(
    session({
        secret: "your-secret-key", // Replace with a strong, random string
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 } // 1-hour session timeout
    })
);


// Routes
// Route to display the Contact Us form
app.get("/contact-us", (req, res) => {
    res.render("contactUs");  // Render the contact form page
});
// Route to handle the Contact Us form submission
app.post("/contact-us", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).send("All fields are required.");
        }

        // Create a new contact message
        const newContactMessage = new ContactMessage({
            name,
            email,
            message
        });

        // Save the contact message to the database
        await newContactMessage.save();

        // Send a confirmation message to be displayed on the page
        req.session.message = {
            type: "success",
            content: "Your message has been submitted! An admin will get in touch with you within 24 hours."
        };

        // Redirect back to the home page after a brief delay
        res.redirect("/");  // You can adjust this to any other page you prefer.

        } catch (error) {
        console.error("Error saving contact message:", error);
        res.status(500).send("An error occurred while submitting your message.");
    }
});

// Route for admins to view all contact submissions
app.get("/admin/contact-messages", async (req, res) => {
    const { user } = req.session; // Get the current session user

    // Check if the user is an admin (you may need to adapt this based on your logic)
    if (!user || user.role !== 'admin') {
        return res.status(403).send("You do not have permission to access this page.");
    }

    try {
        // Retrieve all contact messages from the database
        const messages = await ContactMessage.find().sort({ submittedAt: -1 });

        // Render the admin page with the list of messages
        res.render("adminContactMessages", { messages });
    } catch (error) {
        console.log("Error fetching contact messages:", error);
        res.status(500).send("Error loading contact messages.");
    }
});


///
app.get("/", (req, res) => {
    const { user, message } = req.session;

    // Clear the message after showing it
    req.session.message = null;

    res.render("home", {
        user, // Pass user data (if logged in)
        message // Pass any status message
    });
});

app.get("/forum", async (req, res) => {
    try {
        const posts = await Post.find();
        const user = req.session?.user;  // Get the logged-in user

        // Attach the 'canDelete' flag to each post
        const postsWithDeletePermission = posts.map(post => {
            return {
                ...post.toObject(),
                canDelete: user && user.username === post.author  // Check if the logged-in user is the author
            };
        });

        res.render("forum", { posts: postsWithDeletePermission, user });
    } catch (error) {
        console.log("Error fetching posts:", error);
        res.status(500).send("Error loading posts");
    }
});


app.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/"); // Redirect logged-in users to the homepage
    }
    res.render("login");
});

app.get("/tutors", async (req, res) => {
    try {
        const tutors = await Tutor.find();
        res.render("tutors", { 
            tutors, 
            isLoggedIn: !!req.session?.user // Pass a flag indicating login status
        });
    } catch (error) {
        console.error("Error fetching tutors:", error);
        res.status(500).send("Error loading tutors");
    }
});



// Signup Route
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            req.session.message = { type: "error", content: "All fields are required." };
            return res.redirect("/");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Login({ loginName: username, loginEmail: email, loginPassword: hashedPassword });
        await newUser.save();

        req.session.message = { type: "success", content: "Signup successful! You can now log in." };
        return res.redirect("/");
    } catch (error) {
        console.error("Signup error:", error);
        req.session.message = { type: "error", content: "Server error during signup." };
        return res.redirect("/");
    }
});

// Login Route
app.post("/login", async (req, res) => {
    try {
        const { loginEmail, loginPassword } = req.body;

        if (!loginEmail || !loginPassword) {
            req.session.message = { type: "error", content: "Email and password are required." };
            return res.redirect("/");
        }

        const user = await Login.findOne({ loginEmail });
        if (!user || !(await bcrypt.compare(loginPassword, user.loginPassword))) {
            req.session.message = { type: "error", content: "Invalid email or password." };
            return res.redirect("/");
        }

        req.session.user = { username: user.loginName, email: user.loginEmail };
        req.session.message = { type: "success", content: "Login successful!" };
        return res.redirect("/");
    } catch (error) {
        console.error("Login error:", error);
        req.session.message = { type: "error", content: "Server error during login." };
        return res.redirect("/");
    }
});

// Logout Route
app.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).json({ error: "Error logging out" });
        }
        res.redirect("/");
    });
});

// Forum Post Submission Route
app.post("/forum", async (req, res) => {
    try {
        const { author, content } = req.body;
        if (!author || !content) {
            return res.status(400).send("Both author and content are required");
        }

        const newPost = new Post({
            title: author, // Use the username as the title
            author,
            content
        });

        await newPost.save();
        res.redirect("/forum");
    } catch (error) {
        console.error("Error saving post:", error);
        res.status(500).send("Error saving post");
    }
});

// Forum Delete Request
app.post("/forum/delete/:id", async (req, res) => {
    const postId = req.params.id;
    const loggedInUser = req.session?.user?.username; // Get the logged-in user's username
    
    try {
        const post = await Post.findById(postId); // Find the post by ID

        if (!post) {
            return res.status(404).send("Post not found");
        }

        if (post.author !== loggedInUser) {
            return res.status(403).send("You cannot delete this post"); // Ensure the logged-in user is the author
        }

        // Use findByIdAndDelete to remove the post
        await Post.findByIdAndDelete(postId);
        res.redirect("/forum");
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send("Error deleting post");
    }
});



// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
