const email = localStorage.getItem("userEmail");
const firstName = localStorage.getItem("userName");

if (firstName) {
  document.getElementById("userProfile").textContent = firstName;
}
