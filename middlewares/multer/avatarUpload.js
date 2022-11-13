const { ErrorObject } = require("../../helpers/error");
const multer = require("multer");
const ds = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatars");
  },
  filename: (req, file, cb) => {
    req.body.avatar = `http://localhost:${process.env.PORT || 3000}/avatars/${
      file.originalname
    }`;
    cb(null, file.originalname);
  },
});
const multerConfig = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/svg" ||
      file.mimetype === "image/webp"
    )
      return cb(null, true);

    return cb(new ErrorObject("Invalid avatar file extension.", 422));
  },
  storage: ds,
});
const uploadAvatar = multerConfig.single("avatar");

module.exports = (req, res, next) => {
  uploadAvatar(req, res, (error) => {
    if (error) return res.status(error.statusCode).json(error);
    next();
  });
};
