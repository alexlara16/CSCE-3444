// Example data for tutors
const tutors = [
    { name: 'John Doe', subject: 'Math', location: 'New York' },
    { name: 'Jane Smith', subject: 'English', location: 'Los Angeles' },
    { name: 'Mark Johnson', subject: 'Physics', location: 'Chicago' },
    { name: 'Emily Davis', subject: 'Chemistry', location: 'Houston' },
    { name: 'Michael Brown', subject: 'History', location: 'Philadelphia' }
];

// Load tutor data into the list if on tutors.html
window.onload = function() {
    if (document.getElementById('tutorList')) {
        const tutorList = document.getElementById('tutorList');
        tutors.forEach(tutor => {
            const li = document.createElement('li');
            li.textContent = `${tutor.name} - ${tutor.subject} - ${tutor.location}`;
            tutorList.appendChild(li);
        });
    }

    // Handle Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            // Simple alert for demonstration
            alert(`Logged in as ${email}`);
            // In a real application, you'd handle authentication here
        });
    }

    // Handle Signup Form Submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            // Simple alert for demonstration
            alert(`Signed up as ${name} with email ${email}`);
            // In a real application, you'd handle user registration here
        });
    }
}

// Filter function to search tutors
function filterTutors() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const tutorList = document.getElementById('tutorList');
    const items = tutorList.getElementsByTagName('li');
    
    for (let i = 0; i < items.length; i++) {
        const text = items[i].textContent.toLowerCase();
        if (text.includes(input)) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}
