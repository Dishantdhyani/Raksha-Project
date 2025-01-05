function playSosSound() {
  const sosSound = document.getElementById("sosSound");
  sosSound.play();
}

function callPoliceAction() {
  alert("Calling police...");
  // Add any additional logic for the "Call Police" action here
}

function EmergencyNumber() {
  alert("list of emergency numbers are ...");
}

function PoliceStat() {
  alert("all police station details are here");
}

function FamilyMessage() {
  prompt("message your family member from here");
}

// Create the navbar container
const navbar = document.createElement("div");
navbar.className = "navbar";

// Define link data
const links = [
  { text: "Home", href: "#home" },
  { text: "About Us", href: "#about" },
  { text: "Contact Us", href: "#contact" },
  { text: "Services", href: "#services" },
];

// Create links and append to the navbar
links.forEach((linkData) => {
  const link = document.createElement("a");
  link.href = linkData.href; // Set the href attribute
  link.textContent = linkData.text; // Set the link text
  navbar.appendChild(link); // Add the link to the navbar
});

// Append the navbar to the body
document.body.appendChild(navbar);

const email = localStorage.getItem("userEmail");
const firstName = localStorage.getItem("userName");

if (firstName) {
  document.getElementById("userProfile").textContent = firstName;
}
