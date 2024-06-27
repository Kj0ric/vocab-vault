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
    location.reload(true);

}

function drawTable() {
  
  let answer = currentAnswer

  
  let html = '<div id="wordleContainer"><table>';
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
            
            html += '<td><label for="input' + counter + '">Word ' + (wordCounter+1) + ' Letter ' + (letterCounter+1) + ':</label><input onkeyup="moveForward(this, event)" class="Incorrect" type="text" id="input' + counter + '" name="input' + counter + '" maxlength="1" pattern="' + answer + '" data-correct-pattern="' + correctLetter + '" placeholder=" "></td>';

        }
        html += '</tr>';
        wordCounter +=1
    }

    html += '</table></div><button onclick="refresh()" id="retrybutton">New puzzle</button><br><br><br><br><br><br><br><br>';

    document.body.innerHTML += html;
}   

let correctWord
function CheckInput(event) {
    wordleDiv = document.querySelector('#wordleContainer')
    if (!usagesLeft == 0) {
    
      let inputs = document.querySelectorAll('input');
  
    let rows = document.querySelectorAll('table tr');
  
    inputs.forEach(function(input) {
      const userAnswer = input.value;
      correctWord = input.getAttribute("pattern");
      const correctLetter = input.getAttribute("data-correct-pattern");
  
      let style = window.getComputedStyle(input);
      let pointerEvents = style.getPropertyValue('pointer-events');
  
      if (pointerEvents == 'none'){
  
        if (userAnswer == correctLetter.toUpperCase() || userAnswer == correctLetter.toLowerCase()) {
          input.classList.remove("Incorrect")
          input.classList.remove("WrongPlace")
          input.classList.add("Correct")
        } else if ((correctWord.includes(userAnswer.toLowerCase()) || correctWord.includes(userAnswer.toUpperCase())) && !(userAnswer == correctLetter.toUpperCase() || userAnswer == correctLetter.toLowerCase()) && !(userAnswer == '')) {
          input.classList.remove("Incorrect")
          input.classList.remove("Correct")
          input.classList.add("WrongPlace")
        } else {
          input.classList.remove("WrongPlace")
          input.classList.remove("Correct")
          input.classList.add('Incorrect')
        }
        
      }});
      
      answeredInputs = 0
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
            if (!input.value == '') {
              answeredInputs += 1
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
              wordleDiv.appendChild(winMessage);
              usagesLeft = 1
              retrybutton = document.querySelector('#retrybutton')
              retrybutton.style.display = 'unset'
              
              } 
            }
            console.log(answeredInputs, currentAnswer.length*6)
            if (answeredInputs == currentAnswer.length*6 && isWinner == false) {
              
              // Create a new element, set its text to 'You win', and insert it before the first row
              
              if (usagesLeft > 1) {
                
                let loseMessage = document.createElement('div');
                loseMessage.textContent = 'You lose, the correct word is was ';
                loseMessage.textContent += correctWord
                loseMessage.style.fontSize = '2em'; // Set the font size or any other styles as needed
                let table = document.querySelector('table'); // Replace with your actual table selector
                wordleDiv.appendChild(loseMessage);
                usagesLeft = 1
                retrybutton = document.querySelector('#retrybutton')
                retrybutton.style.display = 'unset'
                
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

function moveForward(input, event) {
  if (input.value.length >= input.maxLength) {
      var next = input.nextElementSibling;
      if (next && next.tagName === "INPUT") {
          next.focus();
      }
  } else if (event.key === "Backspace") {
      var previous = input.previousElementSibling;
      if (previous && previous.tagName === "INPUT") {
        previous.value = ''; 
        previous.focus();
      }
  }
}

let isWinner = false
let usagesLeft = 2

var allFavorites = document.querySelectorAll('div.FavoriteEntry');
var randomIndex = Math.floor(Math.random() * allFavorites.length);
var randomFavoriteDiv = allFavorites[randomIndex];
let currentAnswer = randomFavoriteDiv.querySelector('p').textContent


window.onresize = adjustButtonMargins; //activates the adjustButtonMargins function when resizing the browser window
window.onload = combinedOnloadFunctions; //activates the adjustButtonMargins function when the browser loads
window.onscroll = combinedScrollFunctions; //activates the combinedScrollFunctions function when scrolling

// makes the cursor jump to the next input window when a button (presumabally a letter) is pressed
document.addEventListener('keyup', function(event) {
  var input = event.target;
  if (input.tagName === "INPUT") {
      if (input.value.length >= input.maxLength) {
          var nextTd = input.parentElement.nextElementSibling;
          if (nextTd) {
              var nextInput = nextTd.querySelector('input');
              if (nextInput) {
                  nextInput.focus();
              }
          }
      }
  }
});

// makes the backspace button remove the value in the previous input window when pressed and makes it function normally when the current input element already has a value
document.addEventListener('keydown', function(event) {
  var input = event.target;
  if (input.tagName === "INPUT" && event.key === "Backspace") {
      var previousTd = input.parentElement.previousElementSibling;
      if (previousTd) {
          var previousInput = previousTd.querySelector('input');
          if (previousInput) {
              if (!input.value == '') {
                  input.value = '';
              } else {
                previousInput.value = '';
                previousInput.focus();
              }
          }
      }
  }
});

//makes the enter button move the cursor to the next row and check the word for correct letters
document.addEventListener('keydown', function(event) {
  var input = event.target;
  if (input.tagName === "INPUT" && event.key === "Enter") {
      event.preventDefault(); // prevent form submission
      var currentTd = input.parentElement;
      var nextTr = currentTd.parentElement.nextElementSibling;
      var currentTr = currentTd.parentElement;
      var lastTd = currentTr.querySelector('td:last-of-type');
      if (currentTd == lastTd && !input.value == '') {
        continueWhile = true;
        inputElement = currentTd.querySelector('input');
        currentTr.style.pointerEvents = 'none'
        CheckInput()
        if (nextTr) {
          var nextInput = nextTr.querySelector('input');
          if (nextInput) {
              nextInput.focus();
          }
        }
      } 
      
    }
});
