export function isValidId(input: string): boolean {
  const baseRegex = /^[a-zA-Z0-9]{6,12}$/;

  if (input.includes('@')) {
    const [beforeAt, afterAt] = input.split('@');
    const isBeforeValid = baseRegex.test(beforeAt);
    const afterRegex = /^[a-zA-Z]+\.[a-zA-Z]+$/;
    const isAfterValid = afterRegex.test(afterAt);

    return isBeforeValid || isAfterValid;
  }

  return baseRegex.test(input);
}

export function isValidPw(input: string): boolean {
  const containsLetters = /[a-zA-Z]/.test(input);
  const containsNumbers = /\d/.test(input);
  const containsSpecialChars = /[~!@#$%^&*]/.test(input);
  const isProperLength = input.length >= 8 && input.length <= 15;

  return (
    containsLetters && containsNumbers && containsSpecialChars && isProperLength
  );
}
