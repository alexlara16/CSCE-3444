// Array to hold tutor listings (with random example data)
const tutors = [
    { name: 'John Doe', subject: 'Math', location: 'New York' },
    { name: 'Jane Smith', subject: 'English', location: 'Los Angeles' },
    { name: 'Mark Johnson', subject: 'Physics', location: 'Chicago' },
    { name: 'Emily Davis', subject: 'Chemistry', location: 'Houston' },
    { name: 'Michael Brown', subject: 'History', location: 'Philadelphia' }
];

// Function to filter and display matching tutors
function filterTutors() {
    const tutorList = document.getElementById("tutorList");
    tutorList.innerHTML = ""; // Clear existing listings

    tutors.forEach((tutor) => {
        // Create listing element
        const listingDiv = document.createElement("div");
        listingDiv.className = "listing";
        
        // Add tutor's info to the listing
        const tutorName = document.createElement("h3");
        tutorName.textContent = tutor.name;

        const tutorLocation = document.createElement("p");
        const tutorLocationEm = document.createElement("em");
        tutorLocationEm.textContent = tutor.location;
        tutorLocation.appendChild(tutorLocationEm);

        const tutorSubject = document.createElement("p");
        tutorSubject.textContent = tutor.subject;

        // Append elements to listingDiv
        listingDiv.appendChild(tutorName);
        listingDiv.appendChild(tutorLocation);
        listingDiv.appendChild(tutorSubject);

        // Add listingDiv to the tutorList container if it matches the search term
        const searchBox = document.getElementById('searchInput');
        const matchText = searchBox.value.toUpperCase();

        if (tutorName.textContent.toUpperCase().indexOf(matchText) > -1 && matchText.length > 0 && matchText.trim() != "") {
            tutorList.appendChild(listingDiv);
        } else if (tutorLocation.textContent.toUpperCase().indexOf(matchText) > -1 && matchText.length > 0 && matchText.trim() != "") {
            tutorList.appendChild(listingDiv);
        } else if (tutorSubject.textContent.toUpperCase().indexOf(matchText) > -1 && matchText.length > 0 && matchText.trim() != "") {
            tutorList.appendChild(listingDiv);
        }

    });
}