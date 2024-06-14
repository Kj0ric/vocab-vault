
function adjustButtonMargins() {
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
    makeNavBarSticky();
    adjustButtonMargins();
}

function changeFavoritesButtonText(button) {
    
    if (button.textContent == 'Add to Favorites') {
        button.textContent = 'Added to Favorites'
        button.classList.add('red')
    } else {
        button.textContent = 'Add to Favorites'
        button.classList.remove('red') 
    }

}

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();
  });

window.onresize = adjustButtonMargins;
window.onload = adjustButtonMargins;
window.onscroll = combinedScrollFunctions;