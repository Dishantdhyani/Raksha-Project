const hamburgerMenu = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

// Add click event to toggle visibility of nav links
hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Toggle the 'active' class
});