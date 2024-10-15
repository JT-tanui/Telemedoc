
document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    const toggleSignupPassword = document.getElementById('toggleSignupPassword');
    const signupPassword = document.getElementById('signup-password');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPassword = document.getElementById('confirmPassword');

    togglePassword.addEventListener('click', () => {
        // Toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);

        // Toggle the eye icon
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    toggleSignupPassword.addEventListener('click', () => {
        // Toggle the type attribute
        const type = signupPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        signupPassword.setAttribute('type', type);

        // Toggle the eye icon
        toggleSignupPassword.classList.toggle('fa-eye');
        toggleSignupPassword.classList.toggle('fa-eye-slash');
    });

    toggleConfirmPassword.addEventListener('click', () => {
        // Toggle the type attribute
        const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPassword.setAttribute('type', type);

        // Toggle the eye icon
        toggleConfirmPassword.classList.toggle('fa-eye');
        toggleConfirmPassword.classList.toggle('fa-eye-slash');
    });

    const showSignup = document.getElementById('show-signup');
    const showSignin = document.getElementById('show-signin');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');

    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        signinForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    showSignin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('hidden');
        signinForm.classList.remove('hidden');
    });
});