// Array to hold forum posts
const posts = [];

// Function to add a new post
function addPost() {
    const username = document.getElementById("username").value.trim();
    const content = document.getElementById("postContent").value.trim();

    if (!username || !content) {
        alert("Please enter both username and content.");
        return;
    }

    // Create a post object with username, content, and a unique ID
    const post = {
        id: Date.now(),
        username: username,
        content: content
    };
    
    posts.push(post); // Add the post to the posts array
    displayPosts(); // Refresh the displayed posts

    // Clear input fields
    document.getElementById("username").value = '';
    document.getElementById("postContent").value = '';
}

// Function to display all posts
function displayPosts() {
    const forumPosts = document.getElementById("forumPosts");
    forumPosts.innerHTML = ""; // Clear existing posts

    posts.forEach(post => {
        // Create post element
        const postDiv = document.createElement("div");
        postDiv.className = "forum-post";
        
        // Add username and content to the post
        const authorInfo = document.createElement("h4");
        authorInfo.textContent = `${post.username} posted:`;
        
        const contentPara = document.createElement("p");
        contentPara.textContent = post.content;

        // Create delete button, only visible to post author or moderator
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deletePost(post.id, post.username);

        // Append elements to postDiv
        postDiv.appendChild(authorInfo);
        postDiv.appendChild(contentPara);
        postDiv.appendChild(deleteButton);

        // Add postDiv to the forumPosts container
        forumPosts.appendChild(postDiv);
    });
}

// Function to delete a post
function deletePost(postId, postAuthor) {
    const currentUser = document.getElementById("username").value.trim(); // Get current user's username
    const isModerator = currentUser === "moderator"; // Hardcoded moderator for testing purposes

    // Check if the current user is the post author or a moderator
    if (currentUser === postAuthor || isModerator) {
        // Remove post from the posts array
        const index = posts.findIndex(post => post.id === postId);
        if (index !== -1) {
            posts.splice(index, 1);
            displayPosts(); // Refresh posts display
        }
    } else {
        alert("You do not have permission to delete this post.");
    }
}
