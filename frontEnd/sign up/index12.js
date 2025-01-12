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
  validateLogin();
  registerUser();
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
  window.location.href = "nextPage.html"; 
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

function registerUser() {
  document
    .getElementById("regIdBtn")
    .addEventListener("click", async function (event) {
      event.preventDefault(); // Prevent default form submission

      // Get the values from the input fields
      const first_name = document.getElementById("regIdFName").value;
      const last_name = document.getElementById("regIdLName").value;
      const email = document.getElementById("regIdEmail").value;
      const phone_num = document.getElementById("regIdPhNum").value;
      const password = document.getElementById("regIdPswrd").value;

      // Check if fields are empty
      if (!email || !password) {
        alert("Please fill in all fields.");
        return;
      }

      // Make an API request to validate login credentials
      try {
        const response = await fetch("http://localhost:3001/user/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            first_name,
            last_name,
            phone_num,
          }),
        });

        const data = await response.json();

        if (data != null) {
          alert("Registration successful! Please login to continue.");
          // Redirect to the next page if login is successful
          window.location.href = "./index3.html";
        } else {
          // Show error message if login fails
          document.getElementById("reg-error-message").style.display = "block";
        }
      } catch (error) {
        console.error("Error during registration:", error);
        document.getElementById("reg-error-message").style.display = "block";
      }
    });
}

function validateLogin() {
  document
    .getElementById("signInBtn")
    .addEventListener("click", async function (event) {
      event.preventDefault(); 

      // Get the values from the input fields
      const email = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Check if fields are empty
      if (!email || !password) {
        alert("Please fill in all fields.");
        return;
      }

      // Make an API request to validate login credentials
      try {
        const response = await fetch(
          "http://localhost:3001/user/validateLogin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          },
        );

        const data = await response.json();

        if (data != null) {
          // Store email in localStorage before redirecting
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userName", data.first_name);

          // Redirect to the next page if login is successful
          window.location.href = "./../informative page/infoindex.html";
        } else {
          // Show error message if login fails
          document.getElementById("error-message").style.display = "block";
        }
      } catch (error) {
        console.error("Error during login:", error);
        document.getElementById("error-message").style.display = "block";
      }
    });
}

// Automatically initialize forms on page load
window.onload = initializeForms;
