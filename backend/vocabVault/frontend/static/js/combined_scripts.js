document.addEventListener('DOMContentLoaded', function() {
    calendarFunction();
    adjustButtonMargins();

})

window.addEventListener('scroll', makeNavBarSticky);

function adjustButtonMargins() {
    /*
    This function changes the size of the dropdown buttons and the search bar.
    It also govens the text dispaying variables in the down right corner.

    This function has no parameters and returns nothing
    */
    const buttons = document.querySelectorAll('.dropdown .dropbtn'); //selects all dropdown buttons
    // const dropdown = document.querySelectorAll('.dropdown-content a:hover'); //should select all buttons in the dropdown menus
    const width = window.innerWidth; //grabs the width of the browser window
    const searchBar = document.querySelector('.navbar input[type= text]'); //selects the searchbar
    
    let marginValue = Math.max(width / 10 - 45, 0) + 'px';
    let searchBarWidth = Math.max(width / 3, 66) + 'px';

    // changes the margin value for each dropdown button
    buttons.forEach(button => {
        button.style.paddingRight = marginValue;
        button.style.paddingLeft = marginValue;
    });

    // changes the search bar width
    searchBar.style.width = searchBarWidth;
}

function makeNavBarSticky() {
    /*
    This function makes the navbar sticky when the user scrolls down, it also makes it not sticky anymore when the user scrolls back up
    This function has no parameters and returns nothing
    */
    var navbar = document.getElementById("navbar"); // this selects the navbar
    var sticky = navbar.offsetTop; //this is a variable that hold the distance between the top of the page and the top of the navbar

    // this makes the navbar sticky when the navbar reaches the top of the screen
    if (window.scrollY >= sticky) {
        navbar.classList.add("sticky");
    } else if (window.scrollY < 8) {
        navbar.classList.remove("sticky");
    }
}

function combinedScrollFunctions() {
    /*
    This function combines the makeNavBarSticky, adjustButtonMArgins, and calendarFunction functions so they can both be activated when scrolling
    (the adjustButtonMargins fuction needs to be activated to adjust show the current distance scrolled by the user)
    This function has no parameters and returns nothing
    */
    makeNavBarSticky();
    calendarFunction();
}

// Define calendar globally
var calendarEl = document.getElementById('calendar');
var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
    },
    handleWindowResize: true,
    contentHeight: 400,
    events: [],
    eventClick: function(info) {
        window.open(info.event.url);
        info.jsEvent.preventDefault();
    }
});

// Function to fetch and update calendar events
function updateCalendarEvents() {
    $.ajax({
        url: '/get_words/',
        type: 'GET',
        success: function(response) {
            console.log('Response:', response);
            calendar.removeAllEvents(); // Remove old events
            calendar.addEventSource(response); // Add new events
        }
    });
}

function calendarFunction() {
    // Get the modal
    var modal = document.getElementById("calendarModal");
    // Get the button that opens the modal
    var btn = document.querySelector(".floatingButtonCalendar");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.addEventListener('click', function() {
        modal.style.display = "block";
        
        // Render the calendar
        calendar.render();
        updateCalendarEvents(); // Fetch and update events when modal opens
    });

    // When the user clicks on <span> (x), close the modal
    span.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

// Function to get cookie by name; used to get the CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function initializeFormElements(){
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('email');
    const submitBtn = document.getElementById('submitBtn');

    if (usernameInput && emailInput && submitBtn) {
        submitBtn.addEventListener('click', function(event) {
            handleFormSubmission(event, usernameInput, emailInput);
        });
    }
}

function updateUserInfo(newUsername, newEmail) {
    const data = new FormData();
    data.append('username', newUsername);
    data.append('email', newEmail);

    fetch('update_user_info', { // Adjust the URL based on your routing setup
        method: 'PUT',
        body: new URLSearchParams(data),
        credentials: 'include', // Include cookies in the request
        headers: {
            'X-CSRFToken': getCookie('csrftoken'), // Ensure you are getting the CSRF token correctly
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            console.log('User info updated successfully');
            window.location.reload();
        } else {
            console.error('Error updating user info:', data.error);
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = data.error;
            errorMessage.style.display = 'block';
        }
    })
    .catch(error => console.error('Error:', error));
}

