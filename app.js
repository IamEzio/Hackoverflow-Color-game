const body = document.querySelector('body')
const value = document.querySelector('#value')
const newBtn = document.querySelector('.newBtn')
const easyBtn = document.querySelector('.easyBtn')
const hardBtn = document.querySelector('.hardBtn')
const easyCards = document.querySelectorAll('.easy')
const hardCards = document.querySelectorAll('.hard')
const allCards = document.querySelectorAll('.card')
const result = document.querySelector('#result')

let mode = 3 // 3 for easy and 6 for hard.
let colorStore = []
let answer = ''
hasPlayerWon = false;

// Utility functions
const getRandomColor = function () {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
}

const setRandomColors = function () {
    for (let i = 0; i < 6; i++) colorStore[i] = getRandomColor()
    answer = colorStore[Math.floor(Math.random() * mode)]
};

const setCardColors = function () {
    for (let i = 0; i < mode; i++)
        allCards[i].style.backgroundColor = colorStore[i];
}

const declareWinner = function (id) {
    result.style.color = answer
    result.style.opacity = "1"
    hasPlayerWon = true;
    allCards.forEach((card, index) => {
        if (index != id) {
            card.style.opacity = "0"
            card.style.pointerEvents = "none";
        }
    })
}

const reset = function () {
    result.style.opacity = "0"
    setRandomColors();
    hasPlayerWon = false;
    value.style.backgroundColor = "transparent"
    value.innerHTML = answer;
    easyCards.forEach(card => {
        card.style.opacity = "1"
        card.style.pointerEvents = "all";
    })
    if (mode == 6)
        hardCards.forEach(card => {
            card.style.opacity = "1"
            card.style.pointerEvents = "all";
        })
    setCardColors();
};

window.addEventListener('load', () => {
    mode = 3;
    reset();
})

newBtn.addEventListener('click', () => {
    reset()
})

easyBtn.addEventListener('click', () => {
    mode = 3;
    reset()
    hardCards.forEach(card => {
        card.style.opacity = "0"
        card.style.pointerEvents = "none";
    })
})

hardBtn.addEventListener('click', () => {
    mode = 6;
    reset()
    hardCards.forEach(card => {
        card.style.opacity = "1"
        card.style.pointerEvents = "all";
    })
})

allCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (card.style.backgroundColor == answer) {
            declareWinner(index)
        }
        else if (!hasPlayerWon) {
            card.style.opacity = "0"
            card.style.pointerEvents = "none";
        }
    })
})