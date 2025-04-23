document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const form = new FormData(e.target);
  
    const options = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password")
      })
    };
  
    const response = await fetch("http://localhost:3000/users/register", options);
    const data = await response.json();
  
    if (response.status === 201) {
      alert("Registration successful! You can now log in.");
      window.location.assign("../html/login.html");
    } else {
      alert(data.error || "Registration failed.");
    }
  });
  
