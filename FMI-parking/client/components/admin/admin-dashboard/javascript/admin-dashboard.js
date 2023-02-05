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