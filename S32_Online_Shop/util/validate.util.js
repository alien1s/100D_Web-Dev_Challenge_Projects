function userCredentialsAreValid(email, password) {
  return (
    email && email.includes("@") && password && password.trim().length >= 6
  );
}

function isEmpty(value) {
  return !value || value.trim() === "";
}

function emailIsConfirmed(email, confirmedemail) {
  return email === confirmedemail;
}

function userInputAreValid(userInput) {
  return (
    userCredentialsAreValid(userInput.email, userInput.password) &&
    !isEmpty(userInput.fullname) &&
    !isEmpty(userInput.street) &&
    !isEmpty(userInput.postal) &&
    !isEmpty(userInput.city) &&
    emailIsConfirmed(userInput.email, userInput.confirmedEmail)
  );
}

module.exports = {
  userInputAreValid: userInputAreValid,
};
