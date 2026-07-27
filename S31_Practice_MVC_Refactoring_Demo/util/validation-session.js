function getSessionErrorData(req, defaultValue) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      ...defaultValue,
    };
  }

  req.session.inputData = null;

  return sessionInputData;
}

function flashErrorToSession(req, data, action) {
  req.session.inputData = {
    hasError: true,
    ...data,
  };
  req.session.save(action);
}

module.exports = {
  getSessionErrorData: getSessionErrorData,
  flashErrorToSession: flashErrorToSession,
};
