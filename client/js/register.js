document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent 

  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const passwordInput = document.getElementById('password-input');
  const errorMessage = document.getElementById('error-message');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Check if there any errors
  const errors = [];
  if (name === '') {
    errors.push("Name is required");
    nameInput.parentElement.classList.add('incorrect');
  }
  if (email === '') {
    errors.push("Email is required");
    emailInput.parentElement.classList.add('incorrect');
  }
  if (password === '') {
    errors.push("Password is required");
    passwordInput.parentElement.classList.add('incorrect');
  }

  if (errors.length > 0) {
    errorMessage.innerText = errors.join(". ");
    return; // dont sent if errors
  }

  // Send to the server
  const response = await fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });

  const data = await response.json();

  if (response.status === 201) {
    alert("Registration successful! You can now log in.");
    window.location.assign("../html/login.html");
  } else {
    errorMessage.innerText = data.error || "Registration failed.";
  }
});
