function adjustButtonMargins() {
    /*
    This function changes the size of the dropdown buttons and the search bar.
    It also govens the text dispaying variables in the down right corner.

    This function has no parameters and returns nothing
    */
    const buttons = document.querySelectorAll('.dropdown .dropbtn'); //selects all dropdown buttons
    const dropdown = document.querySelectorAll('.dropdown-content a:hover'); //should select all buttons in the dropdown menus
    const width = window.innerWidth; //grabs the width of the browser window
    const height = window.innerHeight; //grabs the height of the browser window
    const searchBar = document.querySelector('.navbar input[type= text]'); //selects the searchbar
    
    let marginValue;
    let marginValueNumber;

    let searchBarWidth
    let searchBarWidthNumber
    
    // adjusts the margin value based on the width of the browser window
    marginValueNumber = width/10-45;

    // changes the margin value to 0 when it becomes less than 0
    if (marginValueNumber < 0) {
        marginValueNumber = 0
    }

    // changes the margin value to a string and adds 'px'
    marginValue = marginValueNumber + 'px'

    // changes the margin value for each dropdown button
    buttons.forEach(button => {
        button.style.paddingRight = marginValue;
        button.style.paddingLeft = marginValue;
    });
    
    // doesn't work, but the idea was that it changes the size of the buttons in the dropdown menu to match the dropdown buttons
    dropdown.forEach(button => {
        button.style.paddingRight = marginValue;
        button.style.paddingLeft = marginValue;
    });

    // adjusts the search bar width based on the width of the browser window
    searchBarWidthNumber = width/3    ;

    // changes the search bar width to 66 when it becomes less than 66
    if (searchBarWidthNumber < 66) {
        searchBarWidthNumber = 66
    }

    // changes the search bar width to a string and adds 'px'
    searchBarWidth = searchBarWidthNumber + 'px'

    // changes the search bar width
    searchBar.style.width = searchBarWidth;


    // displays the width, height and margin values
    // document.getElementById('windowSize').innerText = `Width: ${width}px, Height: ${height}px, MarginValue: ${marginValue}, SearcBarWidth: ${searchBarWidthNumber}, scrollY: ${window.scrollY}`;
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
        navbar.classList.add("sticky")
    
    }
    
    //this makes the navbar not sticky anymore when the user has scrolled back up
    if (window.scrollY < 8) {
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
    adjustButtonMargins();
    calendarFunction();
}

function calendarFunction() {
    // Get the modal
    var modal = document.getElementById("calendarModal");

    // Get the button that opens the modal
    var btn = document.querySelector(".floatingButtonCalendar");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
        //Initialize the calendar
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
        events: [
            {
                title: 'Word of the day',
                start: '2024-06-13', 
                url: '../Favorite1Page/Favorite1Page.html'
            },
            {
                title: 'Word of the day',
                start: '2024-06-14', 
                url: '../Favorite2Page/Favorite2Page.html'
            },
            {
                title: 'Word of the day',
                start: '2024-06-15', 
                url: '../Favorite3Page/Favorite3Page.html'
            }
        ],
        eventClick: function(info) {
            window.open(info.event.url);
            info.jsEvent.preventDefault();
        }
        });
    
        calendar.render();
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
window.onresize = adjustButtonMargins; //activates the adjustButtonMargins function when resizing the browser window
window.onload = combinedScrollFunctions; //activates the combinedScrollFunctions function when the browser loads
window.onscroll = combinedScrollFunctions; //activates the combinedScrollFunctions function when scrolling


function goToHomePage() {
    window.location.href = "/homepage";  // Redirect to HomePage.html
  }

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

document.addEventListener('DOMContentLoaded', function() {
    register();
});

function register() {
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const url = form.action;

        // Clear previous messages
        document.getElementById('errorMessage').textContent = '';
        document.getElementById('successMessage').textContent = '';

        fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
        })
        .then(response => response.json())
        .then(data => {
            if(data.errors) {
                let allErrorMessages = '';
                for (const field in data.errors) {
                    const errorMessages = data.errors[field];
                    // Check if errorMessages is an array
                    if (Array.isArray(errorMessages)) {
                        // If it is an array, iterate over it
                        errorMessages.forEach(error => {
                            allErrorMessages += error.message + '\n';
                        });
                    } else if (typeof errorMessages === 'string') {
                        // If it's a string, try to parse it as JSON
                        try {
                            const parsedErrorMessages = JSON.parse(errorMessages.replace(/ /g, ''));
                            if (Array.isArray(parsedErrorMessages)) {
                                parsedErrorMessages.forEach(error => {
                                    allErrorMessages += error.message + '\n';
                                });
                            }
                        } catch (e) {
                            // If parsing fails, use the string directly
                            allErrorMessages += errorMessages + '\n';
                        }
                    } else {
                        // If it's not an array or string, directly append it
                        allErrorMessages += errorMessages + '\n';
                    }
                }
                const errorMessageElement = document.getElementById('errorMessage');

                errorMessageElement.textContent = allErrorMessages; // Display the backend error message
                errorMessageElement.style.display = 'block'; // Ensure it's visible
            } else {
                console.log('Success:', data);
                const successMessageElement = document.getElementById('successMessage');
                successMessageElement.innerHTML = 'Successfully registered. Go to Login page.';
                successMessageElement.style.display = 'block';
            }
        })
        .catch(error => {
            // Handle network errors
            console.error('Error:', error);
        });
    });
}