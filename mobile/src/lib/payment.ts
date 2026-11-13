export type CardInput = { number: string; expiry: string; cvc: string };
export type CardErrors = Partial<Record<keyof CardInput, string>>;

const luhnValid = (digits: string): boolean => {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = Number(digits[i]);
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
};

// Test-mode validation only. Real card handling belongs to a payment provider such as Stripe.
export const validateCard = ({ number, expiry, cvc }: CardInput): CardErrors => {
  const errors: CardErrors = {};
  const digits = number.replace(/\s/g, '');

  if (!/^\d{13,19}$/.test(digits) || !luhnValid(digits)) {
    errors.number = 'Enter a valid card number.';
  }

  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) {
    errors.expiry = 'Use the format MM/YY.';
  } else {
    const month = Number(match[1]);
    const year = 2000 + Number(match[2]);
    const lastDay = new Date(Date.UTC(year, month, 0));
    if (month < 1 || month > 12 || lastDay.getTime() < Date.now()) {
      errors.expiry = 'This card has expired or the date is invalid.';
    }
  }

  if (!/^\d{3,4}$/.test(cvc)) {
    errors.cvc = 'Enter the 3 or 4 digit security code.';
  }

  return errors;
};
