var current = 1

/**
 * adds the active class to the first question
 * function is called when questions are inserted into html and calls trackActiveQuestion() to update
 * the active question in the navbar
 */
function active() {
    let questionCount = document.querySelectorAll('#questions .question').length
    document.querySelector(".q_" + current).classList.add("active")
    document.querySelector("h4").textContent = current + "/" + questionCount
    trackActiveQuestion(current)
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
 * Updates the the flag status of the current question
 */
function updateFlagStatus() {
    let question =  document.querySelector('.question.active')
    let qId  = question.dataset.id
    let navItem = document.querySelector('#question-nav').children[qId - 1]
    document.querySelector('#flag-checkbox').checked = flaggedQuestions[qId]
    if (flaggedQuestions[qId]) {
        navItem.querySelector('.flag').classList.add('glyphicon','glyphicon-flag')
    } else {
        navItem.querySelector('.flag').classList.remove('glyphicon','glyphicon-flag')
    }
}

/**
 * Takes you to any question based on parameter
 *
 * @param destinationPage is question to load
 */
function changeQuestion(destinationPage) {
    current = destinationPage
    let destinationQuestion = document.querySelector(".q_" + destinationPage)
    let questionCount = document.querySelectorAll('#questions .question').length
    let nextButton = document.querySelector(".next")
    let prevButton = document.querySelector(".prev")
    document.querySelector("h4").textContent = destinationPage + "/" + questionCount
    // parseInt() in case a string is passed
    switch(parseInt(destinationPage)) {
        case 1:
            prevButton.style.display = "none"
            nextButton.style.display = "inline-block"
            break;
        case questionCount:
            prevButton.style.display = "inline-block"
            nextButton.style.display = "none"
            break;
        default:
            prevButton.style.display = "inline-block"
            nextButton.style.display = "inline-block"
    }

    document.querySelector("#questions .active").classList.remove("active")
    destinationQuestion.classList.add("active")
    trackActiveQuestion(destinationPage)
    updateFlagStatus()
}

/**
 * Fills the question navbar with clickable elements that takes you to the given question number.
 */
function fillNav() {
    let nav = document.querySelector("#question-nav")
    let questions = document.querySelectorAll('.question')
    questions.forEach(function (question) {
        let navItem = document.createElement('div')
        let qNumber = '<p>' + question.dataset['id'] + '</p>'
        let flagBox = '<span class="flag"></span>'
        navItem.classList.add('nav-item', 'unanswered-nav-box')
        navItem.innerHTML += qNumber + flagBox
        navItem.addEventListener('click', function () {
            changeQuestion(question.dataset.id)
        })
        nav.appendChild(navItem)
    })
}

document.querySelector(".next").addEventListener("click", next)
document.querySelector(".prev").addEventListener("click", prev)
document.querySelector('#flag-checkbox').addEventListener('change', updateFlagStatus)