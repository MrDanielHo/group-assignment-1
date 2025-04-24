console.log('✅ auth.js підключено');

document.addEventListener('DOMContentLoaded', () => {
  console.log('🟢 DOM повністю завантажено');

  const profileBtn = document.getElementById('profile-btn');
  const dropdownMenu = document.getElementById('dropdown-menu');
  const authBtn = document.getElementById('auth-btn');

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  // button text
  if (authBtn) {
    authBtn.textContent = isLoggedIn ? 'Logout' : 'Login';
  }

  // show/hide dropdownmenu
  profileBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
  });

  // close dropdown when outside
  window.addEventListener('click', () => {
    dropdownMenu.classList.remove('show');
  });

  // auth
  if (authBtn) {
    authBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent the event from bubbling up to parent elements
      // Log that the auth button was clicked
      console.log('✅ Auth button clicked');

      // token from localStorage
      const token = localStorage.getItem('token');

      //if the user is currently logged in (token exists)
      const isLoggedInNow = !!token;

      if (isLoggedInNow) {
        console.log('🔓 Logout: deleting the token and redirecting to index.html');
        localStorage.removeItem('token');
        window.location.assign('../index.html');
      } else {
        console.log('🔐 Login: redirecting to login.html');
        window.location.assign('../html/login.html');
      }
    });
  } else {
    console.warn('⚠️ Auth button (auth-btn) not found');
  }
});

