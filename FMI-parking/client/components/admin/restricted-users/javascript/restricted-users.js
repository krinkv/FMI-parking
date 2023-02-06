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
    if (user.status === "RESTRICTED_ACESS") {
        txt = "Да";
        bl = "Отблокирай";
    } else {
        txt = "Не";
        bl = "Блокирай";
    }
    const blocked = document.createTextNode(txt);
    blockedEl.appendChild(blocked);

    row.appendChild(emailEl);
    row.appendChild(firstNameEl);
    row.appendChild(lastNameEl);
    row.appendChild(blockedEl);

    if (index % 2 == 1) {
        row.classList.add("active-row");
    } else {
        row.classList.add("not-active-row");
    }

    document.getElementById("table-body").appendChild(row);
  }

  function changeStatus() {
    const inputs = document.querySelectorAll("input, select"); // the input fields and the select one

    let data = {};
    inputs.forEach(input => {
        data[input.name] = input.value;
    })

    sendFormData(data)
            .then((responseMessage) => {
                console.log(responseMessage);
                if (responseMessage["status"] === "ERROR") {
                    throw new Error(responseMessage["message"]);
                }
                else {
                    // print successfull msg ! important               
                }
            })
            .catch((errorMsg) => {
                console.log(errorMsg); // create an error message if the server returned an error
            })
  }

  function sendFormData(data) {
    console.log(data);
    return fetch("../../../../server/controller/restrict_user.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
}