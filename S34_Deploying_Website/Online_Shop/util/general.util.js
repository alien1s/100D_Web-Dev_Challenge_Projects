function setObjectKeysToEmpty(data) {
  if (!data) {
    return {};
  }

  const defaultData = { ...data };

  for (const key in defaultData) {
    defaultData[key] = "";
  }
  return defaultData;
}

const Var = {
  userSignupInputDefaultData: {
    email: "",
    confirmedEmail: "",
    password: "",
    fullname: "",
    street: "",
    postal: "",
    city: "",
  },

  userLoginInputDefaultData: {
    email: "",
    password: "",
  },

  flashedInvaledMessage:
    "Please check your input. Password must be at least 6 character slong, postal code must be 5 characters long.",
  flashedExistingSignupMessage: "User exists already! Try logging in instead!",
  flashedExistingLoginMessage:
    "Invalid credentials - please double-check your email and password!",
};

module.exports = {
  setObjectKeysToEmpty: setObjectKeysToEmpty,
  Var: Var,
};
