import validator from 'email-validator';

export function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000);
}

export function validateEmail(email: string) {
  return validator.validate(email);
}
