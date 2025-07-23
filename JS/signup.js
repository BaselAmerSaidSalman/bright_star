function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);
}

function getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    if (score < 3) return 'weak';
    if (score < 5) return 'medium';
    return 'strong';
}

function updatePasswordStrength(password) {
    const strengthElement = document.getElementById('passwordStrength');
    const fillElement = document.getElementById('strengthFill');
    const textElement = document.getElementById('strengthText');

    if (password.length === 0) {
        strengthElement.style.display = 'none';
        return;
    }

    strengthElement.style.display = 'block';
    const strength = getPasswordStrength(password);
    
    fillElement.className = `strength-fill strength-${strength}`;
    
    const strengthTexts = {
        weak: 'Weak password',
        medium: 'Medium strength',
        strong: 'Strong password'
    };
    
    textElement.textContent = strengthTexts[strength];
}

function showError(elementId, show = true) {
    const element = document.getElementById(elementId);
    element.style.display = show ? 'block' : 'none';
}

function showTerms() {
    alert('Terms of Service would be displayed in a modal or separate page');
}

function showPrivacy() {
    alert('Privacy Policy would be displayed in a modal or separate page');
}

function signupWithGoogle() {
    alert('Google OAuth integration would be implemented here');
}

function signupWithApple() {
    alert('Apple Sign-In integration would be implemented here');
}

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    let isValid = true;
    
    if (firstName.trim().length < 2) {
        showError('firstNameError');
        isValid = false;
    } else {
        showError('firstNameError', false);
    }
    
    if (lastName.trim().length < 2) {
        showError('lastNameError');
        isValid = false;
    } else {
        showError('lastNameError', false);
    }
    
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
    
    if (password !== confirmPassword) {
        showError('confirmPasswordError');
        isValid = false;
    } else {
        showError('confirmPasswordError', false);
    }
    
    if (!agreeTerms) {
        alert('Please agree to the Terms of Service and Privacy Policy');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate successful signup
        document.getElementById('successMessage').style.display = 'block';
        this.reset();
        document.getElementById('passwordStrength').style.display = 'none';
        
        // Simulate redirect to login or dashboard
        setTimeout(() => {
            alert('Account created! Redirecting to login page...');
        }, 2000);
    }
});

// Real-time validation and password strength
document.getElementById('password').addEventListener('input', function() {
    updatePasswordStrength(this.value);
    
    if (this.value && !validatePassword(this.value)) {
        showError('passwordError');
    } else {
        showError('passwordError', false);
    }
});

document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    if (this.value && this.value !== password) {
        showError('confirmPasswordError');
    } else {
        showError('confirmPasswordError', false);
    }
});

document.getElementById('email').addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        showError('emailError');
    } else {
        showError('emailError', false);
    }
});

document.getElementById('firstName').addEventListener('blur', function() {
    if (this.value && this.value.trim().length < 2) {
        showError('firstNameError');
    } else {
        showError('firstNameError', false);
    }
});

document.getElementById('lastName').addEventListener('blur', function() {
    if (this.value && this.value.trim().length < 2) {
        showError('lastNameError');
    } else {
        showError('lastNameError', false);
    }
});