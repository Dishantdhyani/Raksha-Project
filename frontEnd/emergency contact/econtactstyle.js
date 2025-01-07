document.addEventListener("DOMContentLoaded", () => {
  console.log("Emergency contact page loaded successfully!");
  // Additional functionality can be added here.
});

const email = localStorage.getItem("userEmail");
const firstName = localStorage.getItem("userName");

if (firstName) {
  document.getElementById("userProfile").textContent = firstName;
}
