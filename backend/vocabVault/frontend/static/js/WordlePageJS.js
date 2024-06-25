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




function refresh() {
  /* 
    This function refreshes the page to reset the wordle puzzle

    This function jas no parameters and returns nothing
  */
    window.open("WordlePage.html", "_self")

}

function getRandomAnswer() {
    let min = Math.ceil(1);
    let max = Math.floor(4);
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    if (randomNumber == 1) {
    answer = a
  } else if (randomNumber == 2) {
    answer = b
  } else if (randomNumber == 3) {
    answer = c
  } else {
    answer = d
  }
    

    return answer
}

function drawTable() {
    
  let answer = currentAnswer

  
  let html = '<table>';
    let rows = 6
    let letterCount = answer.length;
    let cols = letterCount

    let counter = 0
    let wordCounter = 0

    for(let i = 0; i < rows; i++) {
        html += '<tr>';
        let letterCounter = -1
        for(let j = 0; j < cols; j++) {
            counter += 1
            letterCounter += 1
            let correctLetter = answer.charAt(letterCounter)
            
            html += '<td><label for="input' + counter + '">Word ' + (wordCounter+1) + ' Letter ' + (letterCounter+1) + ':</label><input oninput="CheckInput()" class="Incorrect" type="text" id="input' + counter + '" name="input' + counter + '" maxlength="1" pattern="' + answer + '" data-correct-pattern="' + correctLetter + '" placeholder=" "></td>';

        }
        html += '</tr>';
        wordCounter +=1
    }

    html += '</table>';

    document.body.innerHTML += html;
}

function CheckInput(event) {
    if (!usagesLeft == 0) {
    let inputs = document.querySelectorAll('input');
  
    let rows = document.querySelectorAll('table tr');
  
    inputs.forEach(function(input) {
      const userAnswer = input.value;
      const correctWord = input.getAttribute("pattern");
      const correctLetter = input.getAttribute("data-correct-pattern");
  
      let style = window.getComputedStyle(input);
      let pointerEvents = style.getPropertyValue('pointer-events');
  
      if (pointerEvents == 'none'){
  
        if (userAnswer == correctLetter) {
          input.classList.remove("Incorrect")
          input.classList.remove("WrongPlace")
          input.classList.add("Correct")
        } else if ((correctWord.includes(userAnswer)) && !(userAnswer == correctLetter) && !(userAnswer == '')) {
          input.classList.remove("Incorrect")
          input.classList.remove("Correct")
          input.classList.add("WrongPlace")
        } else {
          input.classList.remove("WrongPlace")
          input.classList.remove("Correct")
          input.classList.add('Incorrect')
        }
        
      }});
      
      rows.forEach(function(row) {
        if (!isWinner == true) {
          // Get all the input elements in this row
          let inputs = row.querySelectorAll('input');
  
          let correctInputs = 0
  
          inputs.forEach(function(input) {
            // If this input does not have the 'Correct' class, set allCorrect to false
            if (input.classList.contains('Correct')) {
              correctInputs += 1
            }
          });
  
          if (correctInputs == currentAnswer.length) {
            isWinner = true
            // Create a new element, set its text to 'You win', and insert it before the first row
            
            if (usagesLeft > 1) {
  
            let winMessage = document.createElement('div');
            winMessage.textContent = 'You win';
            winMessage.style.fontSize = '2em'; // Set the font size or any other styles as needed
            let table = document.querySelector('table'); // Replace with your actual table selector
            table.insertBefore(winMessage, table.firstChild);
            usagesLeft = 1
            } 
            
          } 
        } else {
          row.style.display = 'none';
          
        }
        if (usagesLeft == 1) {usagesLeft = 0}
      });
    
  }}

  function combinedOnloadFunctions() {
    /*
    This function combines the drawTable, adjustButtonMArgins, and calendarFunction functions so they can both be called when the page loads
    

    This function has no parameters and returns nothing
    */
  drawTable();
  adjustButtonMargins();
  calendarFunction();
}


let a = 'lodestone'   //9
let b = 'foment'      //6
let c = 'efficacious' //11
let d = 'consternation'   //13

let isWinner = false
let usagesLeft = 2

let currentAnswer = getRandomAnswer();

window.onresize = adjustButtonMargins; //activates the adjustButtonMargins function when resizing the browser window
window.onload = combinedOnloadFunctions; //activates the adjustButtonMargins function when the browser loads
window.onscroll = combinedScrollFunctions; //activates the combinedScrollFunctions function when scrolling

document.addEventListener('click', CheckInput);
document.addEventListener('keydown', CheckInput);

