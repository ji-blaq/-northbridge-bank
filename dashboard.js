// ======================================
// AUTHENTICATION
// ======================================

const loggedInUserId = Number(localStorage.getItem("loggedInUser"));

if (!loggedInUserId) {

    window.location.href = "login.html";

}

// ======================================
// GET USER
// ======================================

const currentUser = users.find(user => user.id === loggedInUserId);

if (!currentUser) {

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";

}

// ======================================
// ELEMENTS
// ======================================

const welcomeName = document.getElementById("welcomeName");

const checkingBalance = document.getElementById("checkingBalance");

const savingsBalance = document.getElementById("savingsBalance");

const avatar = document.getElementById("avatar");

const transactionList = document.getElementById("transactionList");

const logoutBtn = document.getElementById("logoutBtn");

// ======================================
// FORMAT MONEY
// ======================================

function formatMoney(amount){

    return amount.toLocaleString("en-US",{

        style:"currency",

        currency:"USD"

    });

}

// ======================================
// LOAD USER
// ======================================

function loadUser(){

    welcomeName.textContent =

    `Good Morning, ${currentUser.firstName} 👋`;

    checkingBalance.textContent =

    formatMoney(currentUser.accounts.checking);

    savingsBalance.textContent =

    formatMoney(currentUser.accounts.savings);

    avatar.textContent =

    currentUser.firstName.charAt(0) +

    currentUser.lastName.charAt(0);

}

// ======================================
// TRANSACTIONS
// ======================================

function loadTransactions(){

    transactionList.innerHTML = "";

    currentUser.transactions.forEach(transaction=>{

        const transactionDiv = document.createElement("div");

        transactionDiv.className = "transaction";

        transactionDiv.innerHTML = `

            <div class="transaction-info">

                <h4>${transaction.name}</h4>

                <p>${transaction.date}</p>

            </div>

            <div class="transaction-amount ${transaction.type}">

                ${transaction.type === "credit" ? "+" : "-"}

                ${formatMoney(transaction.amount)}

            </div>

        `;

        transactionList.appendChild(transactionDiv);

    });

}

// ======================================
// LOGOUT
// ======================================

logoutBtn.addEventListener("click",()=>{

    localStorage.removeItem("loggedInUser");

    window.location.href="login.html";

});

// ======================================
// INITIALIZE
// ======================================

loadUser();

loadTransactions();
const mobileLogout = document.getElementById("mobileLogout");

if (mobileLogout) {
    mobileLogout.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    });
}
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