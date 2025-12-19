document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = form.querySelector('.submit-btn');

    // Form validation function
    function validateField(field, errorElement, validationFn) {
        const value = field.value.trim();
        let error = '';

        if (!value) {
            error = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`;
        } else if (validationFn && !validationFn(value)) {
            error = `Please enter a valid ${field.name}`;
        }

        errorElement.textContent = error;
        field.classList.toggle('invalid', !!error);
        return !error;
    }

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Real-time validation
    const fields = [
        { id: 'name', errorId: 'nameError', validationFn: null },
        { id: 'email', errorId: 'emailError', validationFn: validateEmail },
        { id: 'message', errorId: 'messageError', validationFn: null }
    ];

    fields.forEach(({ id, errorId, validationFn }) => {
        const field = document.getElementById(id);
        const errorElement = document.getElementById(errorId);

        field.addEventListener('blur', () => {
            validateField(field, errorElement, validationFn);
        });

        field.addEventListener('input', () => {
            if (errorElement.textContent) {
                validateField(field, errorElement, validationFn);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        fields.forEach(({ id, errorId, validationFn }) => {
            const field = document.getElementById(id);
            const errorElement = document.getElementById(errorId);
            if (!validateField(field, errorElement, validationFn)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Simulate form submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate API call delay
            setTimeout(() => {
                form.style.display = 'none';
                successMessage.style.display = 'block';

                // Reset form after showing success
                setTimeout(() => {
                    form.reset();
                    successMessage.style.display = 'none';
                    form.style.display = 'block';
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';

                    // Clear any remaining errors
                    fields.forEach(({ errorId }) => {
                        document.getElementById(errorId).textContent = '';
                    });
                }, 3000);
            }, 1000);
        } else {
            // Focus first invalid field
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });

    // Add some interactive enhancements
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});
