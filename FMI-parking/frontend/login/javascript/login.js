function login() {
    const inputs = document.querySelectorAll("input"); // all input fields
    const form = document.getElementById("login-form"); // the login form
    const responseDiv = document.getElementById("response-message"); // div which will contain response message
    const toRegistrationBtn = document.getElementById("to-registration-btn"); // button, redirecting to the registration page

    toRegistrationBtn.addEventListener('click', () => {
        window.location.href = "../register/registration_form.html"; // redirect the user over to the registration page with an option to go back from the browser
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent the form from resetting

        // hide the previous message because we may create another one in it's place
        responseDiv.classList.add("no-show");

        // gather the inputted data
        let data = {};
        inputs.forEach((input) => {
            data[input.name] = input.value;
        });

        // clear the contents from the previous message
        responseDiv.innerHTML = null;

        // send the login data to the server
        checkLoginData(data)
        .then((responseMessage) => {
            if (responseMessage["status"] === "ERROR") {
                throw new Error(responseMessage["message"]);
            }
            else {
                window.location.replace("../account/account.html"); // if the login resulted in success, then redirect the user over to his account page
            }
        })
        .catch((errorMessage) => {
            createErrorDivContent(responseDiv, errorMessage); // if the login resulted in an error, then display an error messages
        })
    })
};

/* sends the inputted data over to the backend to authenticate the user */
function checkLoginData(data) {
    // TODO login endpoint 
    return fetch("../../backend/...", {
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


function createErrorDivContent(div, response) {
    // create the text of the response
    let messageContainer = document.createElement("span");
    let message = document.createElement("p");
    message.textContent = response;
    messageContainer.append(message);

    // append the img and span to the div
    div.appendChild(messageContainer);

    // show it to the user
    div.classList.remove("no-show");
}