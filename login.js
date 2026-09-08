document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const togglePassword = document.getElementById('togglePassword');
  const toggleIcon = document.getElementById('toggleIcon');
  const loginAlert = document.getElementById('loginAlert');
  const loginAlertText = document.getElementById('loginAlertText');
  const loginBtn = document.getElementById('loginBtn');
  const loginBtnText = document.getElementById('loginBtnText');
  const loginSpinner = document.getElementById('loginSpinner');

  // Toggle password visibility
  togglePassword.addEventListener('click', function () {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleIcon.textContent = isPassword ? 'visibility_off' : 'visibility';
    togglePassword.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });

  function setFieldError(input, errorEl, message) {
    if (message) {
      input.classList.add('is-invalid');
      errorEl.textContent = message;
    } else {
      input.classList.remove('is-invalid');
      errorEl.textContent = '';
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function hideAlert() {
    loginAlert.classList.add('d-none');
  }

  function showAlert(message) {
    loginAlertText.textContent = message;
    loginAlert.classList.remove('d-none');
  }

  emailInput.addEventListener('input', () => setFieldError(emailInput, emailError, ''));
  passwordInput.addEventListener('input', () => setFieldError(passwordInput, passwordError, ''));

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    hideAlert();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let hasError = false;

    if (!email) {
      setFieldError(emailInput, emailError, 'Email is required.');
      hasError = true;
    } else if (!isValidEmail(email)) {
      setFieldError(emailInput, emailError, 'Enter a valid email address.');
      hasError = true;
    } else {
      setFieldError(emailInput, emailError, '');
    }

    if (!password) {
      setFieldError(passwordInput, passwordError, 'Password is required.');
      hasError = true;
    } else if (password.length < 6) {
      setFieldError(passwordInput, passwordError, 'Password must be at least 8 characters.');
      hasError = true;
    } else {
      setFieldError(passwordInput, passwordError, '');
    }

    if (hasError) return;

    // Loading state
    loginBtn.disabled = true;
    loginBtnText.classList.add('d-none');
    loginSpinner.classList.remove('d-none');

    // TODO: replace with actual authentication request (e.g. fetch to backend API)
    setTimeout(function () {
      loginBtn.disabled = false;
      loginBtnText.classList.remove('d-none');
      loginSpinner.classList.add('d-none');

      // Placeholder response handling — swap with real API result
      showAlert('Invalid email or password.');
    }, 1200);
  });

});
