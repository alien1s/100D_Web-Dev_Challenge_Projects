function getFlashedDataFromSession(req) {
  const sessionFlashedData = req.session.flashedData;

  req.session.flashedData = null;

  return sessionFlashedData;
}

function checkFlashedIsExisting(defaultinputdata, sessionflasheddata) {
  if (!sessionflasheddata) {
    return {
      hasError: false,
      errorMessage: "",
      userInputData: { ...defaultinputdata },
    };
  }
  return sessionflasheddata;
}

function flashDataToSession(req, message, userinput, action) {
  req.session.flashedData = {
    hasError: true,
    errorMessage: message,
    userInputData: { ...userinput },
  };
  req.session.save(action);
}

module.exports = {
  getFlashedDataFromSession: getFlashedDataFromSession,
  flashDataToSession: flashDataToSession,
  checkFlashedIsExisting: checkFlashedIsExisting,
};
