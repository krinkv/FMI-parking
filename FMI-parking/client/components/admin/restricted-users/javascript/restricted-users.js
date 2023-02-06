window.onload = function loadUserProgram() {
    getUserProgram()
        .then((users) => {
            console.log(users);
            for (let i = 0; i < users.length; i++) {
                addElement(users[i], i);
            }
        })
        .catch((errorMessage) => {
            console.log(errorMessage);
        })        
}

function getUserProgram() {
    return fetch("../../../../server/controller/all_users.php", {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data.users;
        })
}

function addElement(user, index) {
    const row = document.createElement("tr");
    const emailEl = document.createElement("td");
    const email = document.createTextNode(user.email);
    emailEl.appendChild(email);

    const firstNameEl = document.createElement("td");
    const firstName = document.createTextNode(user.firstName);
    firstNameEl.appendChild(firstName);

    const lastNameEl = document.createElement("td");
    const lastName = document.createTextNode(user.lastName);
    lastNameEl.appendChild(lastName);

    const blockedEl = document.createElement("td");
    var txt = "";
    if (user.status === "RESTRICTED_ACCESS") {
        txt = "Да";
    } else {
        txt = "Не";
    }
    const blocked = document.createTextNode(txt);
    blockedEl.appendChild(blocked);

    row.appendChild(emailEl);
    row.appendChild(firstNameEl);
    row.appendChild(lastNameEl);
    row.appendChild(blockedEl);
  }