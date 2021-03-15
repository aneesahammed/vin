export const validateNif = (input) => {
  try {
    console.log(
      `---------------🇵🇱 [Validating Nif]->[${input}]---------------`
    );

    const regex = /^\d{9}$/;
    if (!regex.test(input)) return false;

    const weights = [9, 8, 7, 6, 5, 4, 3, 2];
    const digits = [...input.toString()];

    const controlDigit = digits[8];

    let calculatedControlDigit = 0;

    for (let index = 0; index < 8; index++) {
      calculatedControlDigit += parseInt(digits[index]) * weights[index];
    }

    calculatedControlDigit = calculatedControlDigit % 11;

    calculatedControlDigit = 11 - calculatedControlDigit;

    if (calculatedControlDigit > 9) calculatedControlDigit = 0;

    if (calculatedControlDigit === parseInt(controlDigit)) return true;
    else return false;
  } catch (error) {
    console.error(`❎ -> ${error}`);
    return false;
  }
};
