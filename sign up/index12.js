// Toggle responsive navigation menu
function myMenuFunction() {
    var navMenu = document.getElementById("navMenu");

    if (navMenu.className === "nav-menu") {
        navMenu.className += " responsive";
    } else {
        navMenu.className = "nav-menu";
    }
}

// Get the required elements
var loginBtn = document.getElementById("loginBtn");
var registerBtn = document.getElementById("registerBtn");
var loginForm = document.getElementById("login");
var registerForm = document.getElementById("register");

// Initialize the form states
function initializeForms() {
    loginForm.style.left = "4px";
    registerForm.style.right = "-520px";
    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
    loginBtn.className += " white-btn";
    registerBtn.className = "btn";
}

// Switch to the login form
function login() {
    loginForm.style.left = "4px";
    registerForm.style.right = "-520px";
    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
    loginBtn.className = "btn white-btn";
    registerBtn.className = "btn";
}

function login() {
    // Existing login logic
    loginForm.style.left = "4px";
    registerForm.style.right = "-520px";
    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
    loginBtn.className = "btn white-btn";
    registerBtn.className = "btn";

    // Redirect to the next page
    window.location.href = "nextPage.html"; // Replace with the actual URL
}


// Switch to the registration form
function register() {
    loginForm.style.left = "-510px";
    registerForm.style.right = "5px";
    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;
    loginBtn.className = "btn";
    registerBtn.className = "btn white-btn";
}

// Automatically initialize forms on page load
window.onload = initializeForms;
