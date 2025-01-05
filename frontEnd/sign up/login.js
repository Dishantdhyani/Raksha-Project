document.getElementById("signInBtn").addEventListener("click", async function(event) {
    event.preventDefault(); // Prevent default form submission

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
        const response = await fetch('http://localhost:3001/user/validateLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data != null) {
            // Store email in localStorage before redirecting
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', data.first_name);

            // Redirect to the next page if login is successful
            window.location.href = './../informative page/infoindex.html';
        } else {
            // Show error message if login fails
            document.getElementById("error-message").style.display = 'block';
        }
    } catch (error) {
        console.error("Error during login:", error);
        document.getElementById("error-message").style.display = 'block';
    }
});
