// utils/validations.ts
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export interface ValidationResult {
    isValid: boolean;
    message: string;
}

export const validateEmail = (email: string): ValidationResult => {
    if (!email) {
        return {
            isValid: false,
            message: 'Email is required'
        };
    }

    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            message: 'Please enter a valid email address'
        };
    }

    return {
        isValid: true,
        message: 'Email is valid'
    };
};

export const validatePassword = (password: string): ValidationResult => {
    if (!password) {
        return {
            isValid: false,
            message: 'Password is required'
        };
    }

    if (!passwordRegex.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
        };
    }

    return {
        isValid: true,
        message: 'Password is valid'
    };
};

// Optional: Combined validation function
export const validateCredentials = (email: string, password: string): ValidationResult => {
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
        return emailValidation;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        return passwordValidation;
    }

    return {
        isValid: true,
        message: 'Credentials are valid'
    };
};