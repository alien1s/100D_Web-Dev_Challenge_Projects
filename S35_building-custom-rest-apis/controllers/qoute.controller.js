const Qoute = require("../models/qoute.model");

async function getQoutes(req, res, next) {
  let randomQoute;
  try {
    randomQoute = await Qoute.getRandomQoute();
  } catch (error) {
    return next(error);
  }
  res.json({ qoute: randomQoute });
}

module.exports = {
  getQoutes: getQoutes,
};
