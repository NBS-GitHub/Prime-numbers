// Variables
const btn = document.querySelector('button'),
    ul = document.querySelector('ul'),
    speedDisplay = document.querySelector('.speed');

const numbers = [],
    primes = [];

let currentNumber = 2,
    ordinalNumber = 1,
    clickCounter = 0,
    timer = 1000,
    isResetBtnAdded = false;
// End of Variables

// Actualization of the speed message
const addClickCounter = () => {
    const plural = (clickCounter !== 0) ? 's' : '';
    clickCounter++;
    speedDisplay.textContent = `Check speed: ${clickCounter} number${plural}/s.`;
}

// This function adds the reset-button, when the start-button is clicked for the 1st time.
const addResetButton = () => {
    if (isResetBtnAdded) return;
    else isResetBtnAdded = !isResetBtnAdded;

    const buttonsWrap = document.querySelector('.buttonsWrap'),
        resetButton = document.createElement('button'),
        text = document.createTextNode('Reset');

    resetButton.classList.add('button');
    resetButton.classList.add('resetButton');
    resetButton.addEventListener('click', resetNumbers);
    resetButton.appendChild(text);
    buttonsWrap.appendChild(resetButton);
}

// Reloading the page. It executes, when you click the reset-button.
const resetNumbers = () => {
    window.location.reload(false);
}

// Easter egg:
// (function (UP,UP,DOWN,DOWN,LEFT,RIGHT,LEFT,RIGHT,B,A) {
// livesCount = 30;
// })();
// The end of the easter egg.

// Main function
const count = (e) => {

    // This if-statement executes only at the first click of the start-button.
    if (ordinalNumber === 1) {
        e.target.textContent = 'Speed up';
        addResetButton();
    }

    numbers.push(currentNumber);

    let dividersCount = 1;

    // If the currentNumber has more than two dividers, the app finishes checking it and goes to the next number.
    for (let i = 0; i < numbers.length; i++) {
        (currentNumber % numbers[i] === 0) ? dividersCount++ : dividersCount;
        if (dividersCount > 2) break;
    }

    // The following if-statement executes only by prime numbers
    if (dividersCount === 2) {
        primes.push(currentNumber);
        const li = document.createElement('li');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        span1.classList.add('smaller');

        // Choosing the ending of the ordinal number
        let ending;
        let lastOrdinalDigit = ordinalNumber.toString().slice(-1);
        let lastTwoOrdinalDigits = ordinalNumber.toString().slice(-2);
        if (lastTwoOrdinalDigits == 11 || lastTwoOrdinalDigits == 12 || lastTwoOrdinalDigits == 13) ending = 'th';
        else if (lastOrdinalDigit == 1) ending = 'st';
        else if (lastOrdinalDigit == 2) ending = 'nd';
        else if (lastOrdinalDigit == 3) ending = 'rd';
        else ending = 'th';

        span1.innerHTML = `${ordinalNumber}${ending} nr: `;
        span2.textContent = currentNumber;

        // If the number divides by 10, give it another color.
        if (ordinalNumber % 10 === 0) {
            li.style.color = 'goldenrod';
        }

        // If the number divides by 100, keep resizing it.
        if (ordinalNumber % 100 === 0) {
            li.style.animation = 'resize .3s linear infinite both';
        }

        // Giving an id to the bottom-most element.
        if (ordinalNumber === 1) {
            li.setAttribute('id', 'first');
        }

        // Inserting the elements into the DOM.
        li.appendChild(span1);
        li.appendChild(span2);
        ul.insertBefore(li, ul.firstChild);

        ordinalNumber++;
    }

    currentNumber++;

    setTimeout(count, timer);
}
// End of Main function

// Listener starting the main function
btn.addEventListener('click', count);

// Listener updating the speed message
btn.addEventListener('click', addClickCounter);