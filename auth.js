const form = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");

const loginMessage = document.getElementById("loginMessage");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    loginMessage.textContent = "";

    const email = emailInput.value.trim();

    const password = passwordInput.value;

    loginBtn.textContent = "Signing In...";

    loginBtn.disabled = true;

    setTimeout(() => {

        const user = users.find(currentUser => {

            return (

                currentUser.email.toLowerCase() === email.toLowerCase()

                &&

                currentUser.password === password

            );

        });

        if (user) {

            localStorage.setItem(
    "loggedInUser",
    user.id
);
            loginBtn.textContent = "Success ✓";

            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 800);

        }

        else {

            loginMessage.textContent =

                "Incorrect email or password.";

            loginBtn.textContent = "Secure Sign In";

            loginBtn.disabled = false;

            passwordInput.value = "";

            passwordInput.focus();

        }

    }, 1200);

});