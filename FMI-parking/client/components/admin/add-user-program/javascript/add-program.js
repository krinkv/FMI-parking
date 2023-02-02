var activities = document.getElementById("begin-hour");

activities.addEventListener("click", function() {
    var startHour = activities.options[activities.selectedIndex].value;

    var endHourSelect = document.getElementById("end-hour");
    var length = endHourSelect.options.length;
    for (i = length-1; i >= 0; i--) {
        endHourSelect.options[i] = null;
    }

    createOptions(startHour, endHourSelect);
});


function createOptions(startHour, endHourSelect) {
    const HOURS = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", 
                   "15:00:00", "16:00:00", "17:00:00", "18:00:00"];
    var flag = false;
    for (let i = 1; i < HOURS.length; i++) {
        if (startHour === HOURS[i-1]) {
            flag = true;
        }

        if (!flag) {
            continue;
        }

        var option = document.createElement("option");
        option.value = HOURS[i];
        option.innerHTML = HOURS[i].slice(0,5);
    
        endHourSelect.appendChild(option);
    }
}

function addProgram() {
    const form = document.getElementById("add-program-form"); // the registration form
    const inputs = document.querySelectorAll("input, select"); // the input fields and the select one
    const responseDiv = document.getElementById("fail-input-err-msg"); // the div that will contain the error message if the backend returned an error
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent the form from resetting

        // remove styles from last error message
        responseDiv.classList.remove("error");

        // remove last error message
        responseDiv.innerHTML = null;

        // gather all the input information
        let data = {};
        inputs.forEach(input => {
            data[input.name] = input.value;
        })
        sendFormData(data)
            .then((responseMessage) => {
                if (responseMessage["status"] === "ERROR") {
                    throw new Error(responseMessage["message"]);
                }
                else {
                    var successDiv = document.getElementById("success-response");
                    var successResponse = document.createElement("p");
                    successResponse.innerHTML = "Success baby";
                    successDiv.appendChild(successResponse);
                }
            })
            .catch((errorMsg) => {
                showDiv(responseDiv, errorMsg); // create an error message if the server returned an error
            })
    })
};

/* send the inputted data over to the backend and based on the server's response, display an error message or redirect user to his newly created account */
function sendFormData(request) {
return fetch("../../../../server/controller/add_course.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(request)
})
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data;
    })
}

function showDiv(div, message) {
    div.innerHTML = null;
    // create the image of the error (a white exclamation mark)
    let statusImage = document.createElement("img");

    // attach image attributes src and alt
    statusImage.src = "./images/error_response.png";
    statusImage.alt = "white exclamation mark on red background";

    // toggle classes
    div.classList.add("error");
    div.classList.remove("no-show");

    // create error text and append to span element
    let messageContainer = document.createElement("span");
    let responseMessage = document.createElement("p");
    responseMessage.textContent = message;
    messageContainer.appendChild(responseMessage);

    // append all created elements to the response div
    div.appendChild(statusImage);
    div.appendChild(messageContainer);
}
