// ======================================
// AUTHENTICATION
// ======================================

const loggedInUserId = Number(localStorage.getItem("loggedInUser"));

if (!loggedInUserId) {
    window.location.href = "login.html";
}

// ======================================
// GET CURRENT USER
// ======================================

const currentUser = users.find(user => user.id === loggedInUserId);

if (!currentUser) {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

// ======================================
// ELEMENTS
// ======================================

const checkingBalance = document.getElementById("checkingBalance");
const savingsBalance = document.getElementById("savingsBalance");
const avatar = document.getElementById("avatar");
const logoutBtn = document.getElementById("logoutBtn");

// ======================================
// FORMAT MONEY
// ======================================

function formatMoney(amount) {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}

// ======================================
// LOAD USER DATA
// ======================================

function loadAccountData() {

    checkingBalance.textContent =
        formatMoney(currentUser.accounts.checking);

    savingsBalance.textContent =
        formatMoney(currentUser.accounts.savings);

    avatar.textContent =
        currentUser.firstName.charAt(0) +
        currentUser.lastName.charAt(0);

}

loadAccountData();

// ======================================
// LOGOUT
// ======================================

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";

});
// ============================
// MOBILE MENU
// ============================

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const sidebar = document.getElementById("sidebar");
const mobileAvatar = document.getElementById("mobileAvatar");

if (mobileAvatar) {
    mobileAvatar.textContent =
        currentUser.firstName.charAt(0) +
        currentUser.lastName.charAt(0);
}

menuBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
});

closeMenu.addEventListener("click", () => {
    sidebar.classList.remove("active");
});