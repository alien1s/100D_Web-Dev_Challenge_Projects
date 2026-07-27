function postIsValid(title, content) {
  return title && content && title.trim() !== "" && content.trim() !== "";
}

function userCredentialIsValid(email, password, confirmEmail) {
  return (
    email &&
    confirmEmail &&
    password &&
    password.trim().length >= 6 &&
    email === confirmEmail &&
    email.includes("@")
  );
}

module.exports = {
  postIsValid: postIsValid,
  userCredentialIsValid: userCredentialIsValid,
};
