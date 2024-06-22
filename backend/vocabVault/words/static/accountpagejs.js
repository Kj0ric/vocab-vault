function adjustButtonMargins() {
    /*
    This function changes the size of the dropdown buttons and the search bar.
    It also govens the text dispaying variables in the down right corner.

    This function has no parameters and returns nothing
    */
    const buttons = document.querySelectorAll('.dropdown .dropbtn'); //selects all dropdown buttons
    const dropdown = document.querySelectorAll('.dropdown-content a:hover');
    const width = window.innerWidth; //grabs the width of the browser window
    const height = window.innerHeight; //grabs the height of the browser window
    const searchBar = document.querySelector('.navbar input[type= text]');
    
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
    document.getElementById('windowSize').innerText = `Width: ${width}px, Height: ${height}px, MarginValue: ${marginValue}, SearcBarWidth: ${searchBarWidthNumber}, scrollY: ${window.scrollY}`;
}

function makeNavBarSticky() {
    /*
    This function makes the navbar sticky when the user scrolls down, it also makes it not sticky anymore when the user scrolls back up
    
    This function has no parameters and returns nothing
    */
    var navbar = document.getElementById("navbar");

    var sticky = navbar.offsetTop;

    navbar.classList.add("sticky")
    if (window.scrollY >= sticky) {
        navbar.classList.add("sticky")
    
    }
    
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

window.onresize = adjustButtonMargins;
window.onscroll = combinedScrollFunctions;
window.onload = combinedScrollFunctions;

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

        
        // Render the calendar
        calendar.render();

        $.ajax({
            url: '/get_words/',
            type: 'GET',
            success: function(response) {
                console.log('Response:', response);
                //var words = JSON.parse(response);
                // Update the events of the calendar
                calendar.removeAllEvents(); // Remove old events
                calendar.addEventSource(response); // Add new events
            }
        });
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

function displayProfilePic() {
    const input = document.getElementById('photo');
    const img = document.getElementById('profilePic');
    
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        img.src = e.target.result;
        img.style.display = 'block';
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  function submitForm() {
    const formData = new FormData(document.getElementById('profileForm'));

    for (const pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  }
/* here the acount change function start */
  let editMode = false; // Initial state: Display mode

  let savedValues = {
      name: 'John Doe',
      email: 'example@example.com',
      gender: 'male',
      age: '30'
  };
  
  function toggleEdit() {
      editMode = !editMode; // Toggle edit mode
  
      const nameDisplay = document.getElementById('nameDisplay');  
      const emailDisplay = document.getElementById('emailDisplay');
      const genderDisplay = document.getElementById('genderDisplay');
      const ageDisplay = document.getElementById('ageDisplay');
  
      if (editMode) {
          nameDisplay.innerHTML = '<input type="text" id="nameInput" value="' + savedValues.name + '">';
          emailDisplay.innerHTML = '<input type="email" id="emailInput" value="' + savedValues.email + '">';
          genderDisplay.innerHTML = '<select id="genderSelect"><option value="male">male</option><option value="female">female</option><option value="other">other</option></select>'; 
          ageDisplay.innerHTML = '<input type="text" id="ageInput" value="' + savedValues.age + '">';
          
          document.querySelector('button').innerHTML = 'Submit';
      } else {
          if (confirm('Are you sure you want to discard changes?')) {
              nameDisplay.innerHTML = savedValues.name;
              emailDisplay.innerHTML = savedValues.email;
              genderDisplay.innerHTML = savedValues.gender;
              ageDisplay.innerHTML = savedValues.age;
  
              document.querySelector('button').innerHTML = 'Change';}
   
            else {
                        editMode = true; // Stay in edit mode if the user cancels going back to view mode
                    }
                }
  }
  
  function saveChanges() {
      savedValues.name = document.getElementById('nameInput').value;
      savedValues.email = document.getElementById('emailInput').value;
      savedValues.gender = document.getElementById('genderSelect').value;
      savedValues.age = document.getElementById('ageInput').value;
  
      // Update display with the new values - This section can be customized based on how you want to handle the changes visually
      document.getElementById('nameDisplay').innerHTML = savedValues.name;
      document.getElementById('emailDisplay').innerHTML = savedValues.email;
      document.getElementById('genderDisplay').innerHTML = savedValues.gender;
      document.getElementById('ageDisplay').innerHTML = savedValues.age;
  
      toggleEdit(); // Switch back to view mode after saving changes
  }