const email = localStorage.getItem("userEmail");
const firstName = localStorage.getItem("userName");

if (firstName) {
  document.getElementById("userProfile").textContent = firstName;
}

if (!email) {
  alert("Please login!!!");
  window.location.href = "./../sign up/index3.html";
}
