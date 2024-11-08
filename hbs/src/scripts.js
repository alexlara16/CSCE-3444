// Load tutor data into the list if on a page with 'tutorList'
window.onload = function() {
    if (document.getElementById('tutorList')) {
        const tutorList = document.getElementById('tutorList');
        const tutors = [
            { name: 'John Doe', subject: 'Math', location: 'New York' },
            { name: 'Jane Smith', subject: 'English', location: 'Los Angeles' },
            { name: 'Mark Johnson', subject: 'Physics', location: 'Chicago' },
            { name: 'Emily Davis', subject: 'Chemistry', location: 'Houston' },
            { name: 'Michael Brown', subject: 'History', location: 'Philadelphia' }
        ];
        tutors.forEach(tutor => {
            const li = document.createElement('li');
            li.textContent = `${tutor.name} - ${tutor.subject} - ${tutor.location}`;
            tutorList.appendChild(li);
        });
    }

    // Handle Login Form Submission
    const loginForm = document.querySelector('form[action="/login"]');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ loginEmail: email, loginPassword: password })
                });
                const result = await response.json();

                if (response.ok) {
                    // Success message or redirect logic
                    alert('Login successful!');
                    window.location.href = '/'; // Redirect after login
                } else {
                    showErrorPopup(result.error || 'Invalid login credentials');
                }
            } catch (error) {
                showErrorPopup('An error occurred during login. Please try again.');
            }
        });
    }

    // Handle Signup Form Submission
    const signupForm = document.querySelector('form[action="/signup"]');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
    
            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })  // Ensure these match backend expectations
                });
                const result = await response.json();
    
                if (response.ok) {
                    alert(result.message || 'Signup successful! You can now log in.');
                } else {
                    showErrorPopup(result.error || 'Signup failed. Please check your details.');
                }
            } catch (error) {
                showErrorPopup('An error occurred during signup. Please try again.');
            }
        });
    }
    
};

// Popup function to display error messages
function showErrorPopup(message) {
    const popup = document.createElement('div');
    popup.innerText = message;
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.right = '20px';
    popup.style.backgroundColor = '#f44336'; // Red background for errors
    popup.style.color = 'white';
    popup.style.padding = '10px 20px';
    popup.style.borderRadius = '5px';
    popup.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
    popup.style.zIndex = '1000';

    document.body.appendChild(popup);

    // Remove the popup after 3 seconds
    setTimeout(() => {
        popup.remove();
    }, 3000);
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
