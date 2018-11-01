/**
 * fills handlebars template by getting the user data from the api and inserts into the user_list div
 *
 * @param HBTemplate the handlebars template
 */
function fillUserTable(HBTemplate) {
    let template = Handlebars.compile(HBTemplate)

    fetch("http://localhost:8080/user")
        .then(function(result) {
            return result.json()
        })
        .then(function(result) {
            let user_list = document.querySelector(".user-table-entries")
            user_list.innerHTML = ""

            if (result.success) {
                result.data.forEach(function(userData) {
                    let html = template(userData)
                    user_list.innerHTML += html
                })
            } else {
                user_list.innerHTML = "Please contact Admin, user list unavailable"
            }
        })
}

/**
 * get the handlebars template and use this to display the users
 */
function updateUserTable() {
    getTemplateAjax('js/templates/userTable.hbs').then(function (HBTemplate) {
        fillUserTable(HBTemplate)
    })
}

updateUserTable()