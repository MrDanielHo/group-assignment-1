document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const form = new FormData(e.target);
  
    const options = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password")
      })
    };
  
    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();
  
    if (response.status === 200 && data.token) {
      // Save JWT in localStorage
      localStorage.setItem("token", data.token);
  
      alert("Login successful!");
      window.location.assign("leaderboard.html"); 
    } else {
      alert(data.error || "Login failed.");
    }
  });
  