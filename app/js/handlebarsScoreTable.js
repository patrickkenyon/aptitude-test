
/**
 * get the handlebars template (scoreTable.hbs) and add userInfo (Email, Name and Scores) to the template
 */
function updateScoreTable() {
    let users = createUsersObject()

    users.then(function (userInfo) {
        getTemplateAjax('js/templates/scoreTable.hbs').then(function (HBTemplate) {
            fillScoreTable(HBTemplate, userInfo)
            stylePercentage()
        })
    })
}

/**
 * fills handlebars template by passing in object and inserts into the score_list div
 *
 * @param HBTemplate the handlebars template
 * @param ObjFunction the function that creates an object of all fields required in scores page
 */
function fillScoreTable(HBTemplate, userInfo) {
    let template = Handlebars.compile(HBTemplate)
    let score_list = document.querySelector('.score-table-entries')
    if (userInfo.success === true) {
        let html = template(userInfo)
        score_list.innerHTML = html
    } else {
        score_list.innerHTML = "Please contact Admin, user list unavailable"
    }
}

updateScoreTable()

function stylePercentage() {
    document.querySelectorAll('.score_list .percentage').forEach(function (cell) {
        let percentage = parseInt(cell.textContent.slice(0, -1))
        switch (true) {
            case (percentage >= 97):
                cell.classList.add('above96')
                break
            case (percentage > 70):
                cell.classList.add('above70')
                break
            case (percentage === 70):
                cell.classList.add('is70')
                break
        }
    })
}