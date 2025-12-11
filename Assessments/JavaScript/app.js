import * as StorageUtils from './storageUtils.js';

class AppointmentHandler {
    constructor(formId, alertContainerId) {
        this.form = document.getElementById(formId);
        this.alertContainer = document.getElementById(alertContainerId);
        this.addEventListeners(); // 
    }

    showMessage(type, message) {
        const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
        this.alertContainer.innerHTML = `<div class="alert ${alertClass}">${message}</div>`;

        setTimeout(() => {
            this.alertContainer.innerHTML = '';
        }, 5000);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const digitCount = phone.replace(/[^0-9]/g, '').length;
        return digitCount === 10;
    }

    isFutureDateTime(dateStr, timeStr) {
        if (!dateStr || !timeStr) return false;
        
        const appointmentDateTime = new Date(`${dateStr}T${timeStr}`);
        const now = new Date();
        
        return appointmentDateTime.getTime() > now.getTime();
    }

    validateInput(input) {
        const value = input.value.trim();
        const id = input.id;

        if (input.hasAttribute('required') && value === '') {
            return `${input.previousElementSibling.textContent.replace(':', '')} is required.`;
        }
        
        if (id === 'applicantName' && value.length < 3) {
            return 'Name must be at least 3 characters.'; 
        }
        if (id === 'emailAddress' && !this.isValidEmail(value)) {
            return 'Please enter a valid email address.'; 
        }
        if (id === 'phoneNumber' && !this.isValidPhone(value)) {
            return 'Phone number must be exactly 10 digits.'; 
        }
        if (id === 'medicalComment' && value.length < 50) {
            return 'Comment must be a minimum of 50 characters.'; 
        }
        if (id === 'appointmentDate' || id === 'appointmentTime') {
            const dateStr = document.getElementById('appointmentDate').value;
            const timeStr = document.getElementById('appointmentTime').value;
            if (dateStr && timeStr && !this.isFutureDateTime(dateStr, timeStr)) {
                return 'Appointment must be a valid future Date and Time.'; 
            }
        }

        return null; // Valid
    }

    validateForm() {
        let formIsValid = true;
        const inputs = this.form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            const errorElement = document.getElementById(`${input.id}Error`);
            const errorMessage = this.validateInput(input);
            
            if (errorElement) {
                if (errorMessage) {
                    errorElement.textContent = errorMessage;
                    input.classList.add('is-invalid');
                    formIsValid = false;
                } else {
                    errorElement.textContent = '';
                    input.classList.remove('is-invalid');
                }
            }
        });

        return formIsValid;
    }

    saveToLocalStorage(formData) {
        const appointments = StorageUtils.getItem();
        
        const newAppointment = {
            id: Date.now().toString(),
            submittedAt: new Date().toISOString(),
            ...formData
        };

        appointments.push(newAppointment);
        StorageUtils.setItem(appointments);
    }

    clearForm() {
        this.form.reset();
        this.form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        this.form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    }

    addEventListeners() {
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));

        this.form.addEventListener('blur', this.handleRealTimeValidation.bind(this), true); 
        this.form.addEventListener('input', this.handleRealTimeValidation.bind(this));
        
        const today = new Date();
        const minDate = today.toISOString().split('T')[0];
        document.getElementById('appointmentDate').setAttribute('min', minDate);
    }

    handleRealTimeValidation(event) {
        const input = event.target;
        if (input.tagName !== 'INPUT' && input.tagName !== 'TEXTAREA') return;

        const errorElement = document.getElementById(`${input.id}Error`);
        if (errorElement) {
            this.validateInput(input);
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();

        if (this.validateForm()) {
            const formData = {
                name: document.getElementById('applicantName').value.trim(),
                email: document.getElementById('emailAddress').value.trim(),
                phone: document.getElementById('phoneNumber').value.trim(),
                date: document.getElementById('appointmentDate').value,
                time: document.getElementById('appointmentTime').value,
                comment: document.getElementById('medicalComment').value.trim()
            };

            this.saveToLocalStorage(formData);  

            this.clearForm(); 
            this.showMessage('success', '✅ Appointment successfully booked and saved!');
        } else {
            this.showMessage('error', '🛑 Please correct the errors in the form.');
            const firstInvalid = this.form.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AppointmentHandler('appointmentForm', 'alertContainer');
});