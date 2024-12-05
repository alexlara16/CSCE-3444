// Handle Login Form Submission
window.onload = function () {
    const loginForm = document.querySelector('form[action="/login"]');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
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
                    alert(result.message || 'Login successful!');
                    window.location.href = '/'; // Redirect to home or desired page
                } else {
                    alert(result.error || 'Invalid login credentials');
                }
            } catch (error) {
                alert('An error occurred during login. Please try again.');
            }
        });
    }
// Handle Signup Form Submission
    const signupForm = document.querySelector('form[action="/signup"]');
    if (signupForm) {
        signupForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });
                const result = await response.json();

                if (response.ok) {
                    alert(result.message || 'Signup successful! You can now log in.');
                    window.location.href = '/login'; // Redirect to login page
                } else {
                    alert(result.error || 'Signup failed. Please check your details.');
                }
            } catch (error) {
                alert('An error occurred during signup. Please try again.');
            }
        });
    }
};

// Handle Search Function
window.onload = function () {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterTutors); // Trigger filterTutors when input changes
    }
};

//Handle Tutor filtering
function filterTutors() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const tutorList = document.getElementById('tutorList');
    const items = tutorList.getElementsByTagName('li');

    for (let i = 0; i < items.length; i++) {
        const text = items[i].textContent.toLowerCase(); // Get the text content of each tutor item
        if (text.includes(input)) {
            items[i].style.display = "";  // Show the tutor item
        } else {
            items[i].style.display = "none";  // Hide the tutor item
        }
    }
}

