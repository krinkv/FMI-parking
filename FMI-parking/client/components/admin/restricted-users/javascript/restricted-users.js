window.onload = function loadUserProgram() {
    getUserProgram()
        .then((users) => {
            for (let i = 0; i < users.length; i++) {
                addElement(users[i], i);
            }
        })
        .catch((errorMessage) => {
            console.log(errorMessage);
        })        
}

function getUserProgram() {
    return fetch("../../../../server/controller/get_all_users.php", {
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
    const firstName = document.createTextNode(user.first_name);
    firstNameEl.appendChild(firstName);

    const lastNameEl = document.createElement("td");
    const lastName = document.createTextNode(user.last_name);
    lastNameEl.appendChild(lastName);

    const blockedEl = document.createElement("td");
    var txt = "";
    var bl = "";
    if (user.status === "RESTRICTED_ACCESS") {
        txt = "Да";
        bl = "Отблокирай";
    } else {
        txt = "Не";
        bl = "Блокирай";
    }
    const blocked = document.createTextNode(txt);
    blockedEl.appendChild(blocked);

    const actionEl = document.createElement("td");
    actionEl.classList.add("btn");
    const linkEl = document.createElement("a");
    const btnTxt = document.createTextNode(bl);
    // linkEl.href="#";
    linkEl.appendChild(btnTxt);
    actionEl.appendChild(linkEl);

    row.appendChild(emailEl);
    row.appendChild(firstNameEl);
    row.appendChild(lastNameEl);
    row.appendChild(blockedEl);
    row.appendChild(actionEl);

    if (index % 2 == 0) {
        row.classList.add("active-row");
    } else {
        row.classList.add("not-active-row");
    }

    document.getElementById("table-body").appendChild(row);
  }