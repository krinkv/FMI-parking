window.addEventListener('load', function() {
    authenticate();
});

function authenticate() {
    if (document.cookie == null) {
        window.location.replace("../../../login/login.html");
    }

    getAuthDetails().then((response) => {
        if (response.role != "ADMIN") {
            window.location.replace("../../home/home.html");
        }
    })
    .catch((errorMessage) => {
        console.log(errorMessage);
    });
}

function addUser() {

    const form = document.getElementById("registration-form"); // the registration form
    const inputs = document.querySelectorAll("input, select"); // the input fields and the select one
    const responseDiv = document.getElementById("response-message-register"); // the div that will contain the error message if the backend returned an error
    responseDiv.classList.remove("success");
    responseDiv.classList.remove("fail");
    
    // remove styles from last error message
    responseDiv.classList.remove("error");
    // remove last error message
    responseDiv.innerHTML = null;
    // gather all the input information
    let data = {};
    inputs.forEach(input => {
        data[input.name] = input.value;
    })
    console.log(data);
    sendFormData(data)
        .then((responseMessage) => {
            if (responseMessage["status"] === "ERROR") {
                throw new Error(responseMessage["message"]);
            }
            else {
                showDiv(responseDiv, "Успешна регистрация!", false);
            }
        })
        .catch((errorMsg) => {
            showDiv(responseDiv, errorMsg, true); // create an error message if the server returned an error
        })
};

/* send the inputted data over to the backend and based on the server's response, display an error message or redirect user to his newly created account */
function sendFormData(data) {
    return fetch("../../../../server/controller/user_registration.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        })
}

function getAuthDetails() {
    return fetch("../../../../server/controller/current_user.php", {
        method: "GET",
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data;
    })
}

function showDiv(div, message, isError) {
    div.innerHTML = null;

    // toggle classes
    div.classList.add("error");
    div.classList.remove("no-show");

    if (isError) {
        div.classList.add("fail");
    } else {
        div.classList.add("success");
    }

    // create error text and append to span element
    let messageContainer = document.createElement("span");
    let responseMessage = document.createElement("p");
    responseMessage.textContent = message;
    messageContainer.appendChild(responseMessage);

    // append all created elements to the response div
    div.appendChild(messageContainer);
}
