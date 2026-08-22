const uuId = require("uuid").v7;
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: "products_data/images",
    filename: function (req, file, cb) {
      cb(null, uuId() + "-" + file.originalname);
    },
  }),
});

const configuredImageUploadFunc = upload.single("image");

module.exports = configuredImageUploadFunc;
