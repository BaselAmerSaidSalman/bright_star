function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(elementId, show = true) {
    const element = document.getElementById(elementId);
    element.style.display = show ? 'block' : 'none';
}

function showForgotPassword() {
    alert('Forgot password functionality would redirect to password reset page');
}

function loginWithGoogle() {
    alert('Google OAuth integration would be implemented here');
}

function loginWithApple() {
    alert('Apple Sign-In integration would be implemented here');
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let isValid = true;
    
    if (!validateEmail(email)) {
        showError('emailError');
        isValid = false;
    } else {
        showError('emailError', false);
    }
    
    if (!validatePassword(password)) {
        showError('passwordError');
        isValid = false;
    } else {
        showError('passwordError', false);
    }
    
    if (isValid) {
        // Simulate successful login
        document.getElementById('successMessage').style.display = 'block';
        this.reset();
        
        // Simulate redirect after success
        setTimeout(() => {
            alert('Redirecting to dashboard...');
        }, 1500);
    }
});

// Real-time validation
document.getElementById('email').addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        showError('emailError');
    } else {
        showError('emailError', false);
    }
});

document.getElementById('password').addEventListener('input', function() {
    if (this.value && !validatePassword(this.value)) {
        showError('passwordError');
    } else {
        showError('passwordError', false);
    }
});