// ======================================
// LOGIN ELEMENTS
// ======================================

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const loginStep = document.getElementById("loginStep");

const codeStep = document.getElementById("codeStep");

const uniqueCodeInput = document.getElementById("uniqueCode");

const verifyCodeBtn = document.getElementById("verifyCodeBtn");

const backToLogin = document.getElementById("backToLogin");

const loginMessage = document.getElementById("loginMessage");


// ======================================
// TEMPORARY USER
// ======================================

let authenticatedUser = null;


// ======================================
// SHOW MESSAGE
// ======================================

function showMessage(message, type) {

    loginMessage.textContent = message;

    loginMessage.className = type;

}


// ======================================
// STEP 1
// EMAIL + PASSWORD
// ======================================

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = emailInput.value.trim();

    const password = passwordInput.value;


    const user = users.find(function(user) {

        return (
            user.email === email &&
            user.password === password
        );

    });


    // Incorrect login

    if (!user) {

        showMessage(
            "Incorrect email or password.",
            "error"
        );

        return;

    }


    // Save user temporarily

    authenticatedUser = user;


    // Hide first step

    loginStep.style.display = "none";


    // Show code step

    codeStep.style.display = "block";


    // Clear old message

    showMessage("", "");


    // Focus code field

    uniqueCodeInput.focus();

});


// ======================================
// STEP 2
// VERIFY UNIQUE CODE
// ======================================

verifyCodeBtn.addEventListener("click", function() {

    const enteredCode =
        uniqueCodeInput.value.trim();


    if (!authenticatedUser) {

        showMessage(
            "Login session expired. Please sign in again.",
            "error"
        );

        return;

    }


    // Check unique code

    if (
        enteredCode !==
        authenticatedUser.uniqueCode
    ) {

        showMessage(
            "Incorrect security code.",
            "error"
        );

        return;

    }


    // ==================================
    // SUCCESS
    // ==================================

    localStorage.setItem(
        "loggedInUser",
        authenticatedUser.id
    );


    showMessage(
        "Verification successful. Redirecting...",
        "success"
    );


    setTimeout(function() {

        window.location.href = "dashboard.html";

    }, 500);

});


// ======================================
// BACK TO LOGIN
// ======================================

backToLogin.addEventListener("click", function() {

    authenticatedUser = null;

    codeStep.style.display = "none";

    loginStep.style.display = "block";

    uniqueCodeInput.value = "";

    showMessage("", "");

    emailInput.focus();

});