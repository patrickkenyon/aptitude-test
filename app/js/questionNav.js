var current = 1

/**
 * adds active to the first question
 * function in called when questions are inserted into html
 */
function active() {
    let questionCount = document.querySelectorAll('#questions .question').length
    document.querySelector(".q_" + current).classList.add("active")
    document.querySelector("h4").textContent = current + "/" + questionCount
}

/**
 * adds active class to next question, removes from current question
 * makes the prev and next buttons appear when needed
 */
function next() {
    current++
    changeQuestion(current)
}

/**
 * adds active class to prev question, removes from current question
 * makes the prev and next buttons appear when needed
 */
function prev() {
    current--
    changeQuestion(current)
}

/**
 * Takes you to any question based on parameter
 *
 * @param destinationPage is question to load
 */
function changeQuestion(destinationPage) {
    let destinationQuestion = document.querySelector(".q_" + destinationPage)
    let questionCount = document.querySelectorAll('#questions .question').length
    let nextButton = document.querySelector(".next")
    let prevButton = document.querySelector(".prev")
    document.querySelector("h4").textContent = destinationPage + "/" + questionCount

    switch(destinationPage) {
        case 1:
            prevButton.style.display = "none"
            nextButton.style.display = "block"
            break;
        case questionCount:
            prevButton.style.display = "block"
            nextButton.style.display = "none"
            break;
        default:
            prevButton.style.display = "block"
            nextButton.style.display = "block"
    }

    document.querySelector("#questions .active").classList.remove("active")
    destinationQuestion.classList.add("active")
}

/*
 * Fills the question navbar with clickable elements that takes you to the given question number.
 */
function fillNav() {
    let nav = document.querySelector("#question-nav")
    let questions = document.querySelectorAll('.question')
    let counter = 1
    questions.forEach(function (question) {
        nav.innerHTML += '<span class="nav-item"><p>' + question.dataset['id'] + '</p></span>'
        counter++
    })
}

/**
 * Makes nav-items clickable to jump to specified question
 */
function addNavLinks() {
    document.querySelectorAll('.nav-item').forEach(function(button) {
        let qID = button.querySelector('p').textContent
        button.addEventListener('click', function () {
            changeQuestion(qID)
        })
    })
}

document.querySelector(".next").addEventListener("click", next)
document.querySelector(".prev").addEventListener("click", prev)