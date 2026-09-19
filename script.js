// Initialize Country Code Input (Pakistan Default + All Countries)
const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "pk", // Pakistani (+92) default
    preferredCountries: ["pk", "in", "ae", "sa", "gb", "us"],
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
});

// Toggle Sign Up and Sign In Forms
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const showLogin = document.getElementById('show-login');
const showSignup = document.getElementById('show-signup');

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
});

// Password Toggle Functions
function setupPasswordToggle(inputId, toggleId) {
    const passwordInput = document.getElementById(inputId);
    const togglePassword = document.getElementById(toggleId);

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
}

setupPasswordToggle('password', 'togglePassword');
setupPasswordToggle('login-password', 'toggleLoginPassword');
