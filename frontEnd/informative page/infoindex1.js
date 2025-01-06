function playSosSound() {
  const sosSound = document.getElementById("sosSound");
  sosSound.play();
}

function callPoliceAction() {
  alert("Calling police...");
  // Add any additional logic for the "Call Police" action here
}

function PoliceStat() {
  // alert("all police station details are here");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to handle successful location fetch
function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Send location data to a server or external service
  console.log("Latitude: " + latitude + ", Longitude: " + longitude);

  // Example: Redirecting to a nearby police station search page
  const nearbyPoliceURL = `https://www.google.com/maps/search/police+station/@${latitude},${longitude},15z`;
  window.open(nearbyPoliceURL, "_blank");
}

// Function to handle errors
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
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
