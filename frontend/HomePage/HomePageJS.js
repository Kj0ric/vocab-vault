window.onload = function() {
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
        This function combines the makeNavBarSticky and adjustButtonMArgins functions so they can both be activated when scrolling
        (the adjustButtonMargins fuction needs to be activated to adjust show the current distance scrolled by the user)
    
        This function has no parameters and returns nothing
        */
        makeNavBarSticky();
        adjustButtonMargins();
    }

    window.onresize = adjustButtonMargins;
    window.onscroll = combinedScrollFunctions;

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