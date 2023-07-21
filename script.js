const keys = document.querySelectorAll('.key');
const upperScreen = document.querySelector('.upper-screen');
const lowerScreen = document.querySelector('.lower-screen');

const key0 = document.getElementById('n0');
const key1 = document.getElementById('n1');
const key2 = document.getElementById('n2');
const key3 = document.getElementById('n3');
const key4 = document.getElementById('n4');
const key5 = document.getElementById('n5');
const key6 = document.getElementById('n6');
const key7 = document.getElementById('n7');
const key8 = document.getElementById('n8');
const key9 = document.getElementById('n9');
const keyDel = document.getElementById('del');
const keyAc = document.getElementById('ac');
const keyDiv = document.getElementById('divisor');
const keyMult = document.getElementById('mult');
const keySub = document.getElementById('sub');
const keyAdd = document.getElementById('add');
const keyEqual = document.getElementById('equal');
const keyDot = document.getElementById('dot');

let currentNumber = 0;
let dotCounter = 0;

key1.onclick = () => appendNumber(1);
key2.onclick = () => appendNumber(2);
key3.onclick = () => appendNumber(3);
key4.onclick = () => appendNumber(4);
key5.onclick = () => appendNumber(5);
key6.onclick = () => appendNumber(6);
key7.onclick = () => appendNumber(7);
key8.onclick = () => appendNumber(8);
key9.onclick = () => appendNumber(9);
key0.onclick = () => appendNumber(0);
keyDot.onclick = () => appendNumber('.')

keyDel.onclick = () => removeNumber();
keyAc.onclick = () => clearScreen();


function add(addNumber1, addNumber2) {
    return addNumber1 + addNumber2;
};

function sub(subNumber1, subNumber2) {
    return subNumber1 - subNumber2;
}

function multiply(multNumber1, multNumber2) {
    return multNumber1 * multNumber2;
};

function division(divNumber1, divNumber2) {
    return divNumber1 / divNumber2;
};

function getCurrentString() {
    return lowerScreen.innerHTML;
}

function getCurrentNumber() {
    return Number(lowerScreen.innerHTML);
}

function appendNumber(key) {
    if (getCurrentString() === '0') {
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
}

function removeNumber() {
    if (getCurrentString().length == 1) {
        lowerScreen.innerHTML = '0';
    } else {
        const current = getCurrentString().split("");
        let last = current.pop();
        if (last === '.') {
            dotCounter = 0;
        }
        lowerScreen.innerHTML = current.join("");
    }
}

function clearScreen() {
    upperScreen.innerHTML = '';
    lowerScreen.innerHTML = '0';
    dotCounter = 0;
}