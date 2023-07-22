const keyNumbers = document.querySelectorAll('.key-number');
const keyOperations = document.querySelectorAll('.key-operation');
const keySpecial = document.querySelectorAll('.key-special');
const upperScreen = document.querySelector('.upper-screen');
const lowerScreen = document.querySelector('.lower-screen');
const timeText = document.getElementById('hour');
const time = new Date();

const hour = time.getHours();
const minutes = time.getMinutes();

const amPM = hour >= 12 ? 'pm' : 'am';
const hour12 = hour % 12 || 12;

if (minutes < 10) { timeText.innerHTML = `${hour12}:0${minutes} ${amPM}`;}
else {timeText.innerHTML = `${hour12}:${minutes} ${amPM}`;}


let upperScreenNumber = 0;
let lowerScreenNumber = 0;
let result = 0;
let dotCounter = 0;
let operationMode = '';
let operationBuffer = '+';

keyNumbers.forEach((button) => {
    button.addEventListener('click', () => appendNumber(button.textContent))
});

keyOperations.forEach((button) => {
    button.addEventListener('click', () => setOperation(button.textContent))
});

function calculate() {
    upperScreenNumber = getUpperScreenNumber();
    lowerScreenNumber = getLowerScreenNumber();

    if (operationBuffer === '+') return parseFloat((upperScreenNumber + lowerScreenNumber).toFixed(4));
    if (operationBuffer === '−') return parseFloat((upperScreenNumber - lowerScreenNumber).toFixed(4));
    if (operationBuffer === '×') return parseFloat((upperScreenNumber * lowerScreenNumber).toFixed(4));
    if (operationBuffer === '÷') return parseFloat((upperScreenNumber / lowerScreenNumber).toFixed(4));
    if (operationBuffer === '=') return parseFloat(lowerScreenNumber.toFixed(4));
}

function showResult() {
    const result = calculate();
    if (result == Infinity || result == -Infinity) { upperScreen.innerHTML = ''; lowerScreen.innerHTML = 'ERROR' }
    else if (operationMode === '=' && result != Infinity) {
        upperScreen.innerHTML = `${upperScreenNumber} ${operationBuffer} ${lowerScreenNumber} =`;
        lowerScreen.innerHTML = `${result}`;
    } else {
        upperScreen.innerHTML = `${result} ${operationMode}`;
        lowerScreen.innerHTML = `0`;
    }
    dotCounter = 0;
    operationBuffer = operationMode;
}

function setOperation(operation) {
    if (operation === '+') { operationMode = '+'; showResult(); }
    if (operation === '−') { operationMode = '−'; showResult(); }
    if (operation === '×') { operationMode = '×'; showResult(); }
    if (operation === '÷') { operationMode = '÷'; showResult(); }
    if (operation === 'DEL') { removeNumber() }
    if (operation === 'AC') { clearScreen() }
    if (operation === '=') { operationMode = '='; showResult(); }
}

function getCurrentString() {
    return lowerScreen.innerHTML;
};

function getLowerScreenNumber() {
    return Number(lowerScreen.innerHTML);
};

function getUpperScreenNumber() {
    const numbersToRemove = ['+', '−', '×', '÷']
    return Number(upperScreen.innerHTML.split('').filter((num) => !numbersToRemove.includes(num)).join(''));
};

function appendNumber(key) {
    if (getCurrentString() === '0' || getCurrentString() === 'ERROR') {
        if (key === '.') {
            lowerScreen.innerHTML = '0';
        } else {
            lowerScreen.innerHTML = String(key);
        }
    } else {
        if (dotCounter === 0) {
            lowerScreen.innerHTML = getCurrentString() + String(key);
            if (key === '.') {
                dotCounter = 1;
            }
        }
        if (dotCounter === 1 && key != '.') {
            lowerScreen.innerHTML = getCurrentString() + String(key);
        }

    }
};

function removeNumber() {
    if (getCurrentString().length == 1) { lowerScreen.innerHTML = '0'; }
    else {
        const current = getCurrentString().split("");
        let last = current.pop();
        if (last === '.') {
            dotCounter = 0;
        }
        lowerScreen.innerHTML = current.join("");
    }
};

function clearScreen() {
    upperScreen.innerHTML = '';
    lowerScreen.innerHTML = '0';
    upperScreenNumber = 0;
    lowerScreenNumber = 0;
    operationMode = '';
    operationBuffer = '+'
    dotCounter = 0;
};