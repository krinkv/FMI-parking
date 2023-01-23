const toRegistrationBtn = document.getElementById("to-login-page"); // button, redirecting to the registration page

toRegistrationBtn.addEventListener('click', () => {
    window.location.href = "../login/login.html"; // redirect the user over to the registration page with an option to go back from the browser
});