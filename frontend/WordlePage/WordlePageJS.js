
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

let a = 'lodestone'   //9
let b = 'foment'      //6
let c = 'efficacious' //11
let d = 'consternation'   //13

function refresh() {
  window.open("WordlePage.html", "_self")

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawTable() {
    
  let answer = 'fish'

  let randomNumber = getRandomInt(1,4);
  if (randomNumber == 1) {
    answer = a
  } else if (randomNumber == 2) {
    answer = b
  } else if (randomNumber == 3) {
    answer = c
  } else {
    answer = d
  }
  
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
            html += '<td><label for="input' + counter + '">Word ' + (wordCounter+1) + ' Letter ' + (letterCounter+1) + ':</label><input type="text" id="input' + counter + '" name="input' + counter + '" maxlength="1" pattern="[' + answer + ']" data-correct-pattern="[' + correctLetter + ']" placeholder=" "></td>';
        }
        html += '</tr>';
        wordCounter +=1
    }

    html += '</table>';

    document.body.innerHTML += html;
}


function combinedOnloadFunctions() {
    drawTable();
    adjustButtonMargins();
}

document.querySelectorAll("input").forEach((inpt) => {
        inpt.addEventListener("input", function (e) {
          const correct = this.value.match(new RegExp(this.getAttribute("data-correct-pattern")));
            if (correct) {
              this.removeAttribute("data-incorrect");
            } else {
              this.setAttribute("data-incorrect", true);
            }
        });
      });




window.onresize = adjustButtonMargins;
window.onload = combinedOnloadFunctions;
window.onscroll = combinedScrollFunctions;