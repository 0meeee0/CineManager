const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
}).fields([
  { name: "poster", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);


module.exports = upload;
