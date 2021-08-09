import * as path from "path";
import * as crypto from "crypto";
import * as multer from "multer";

export const multerConfig = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "upload"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "upload"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          cb(err, "");
        }

        const filename = `${hash.toString("hex")}_${file.originalname}`;
        cb(null, filename);
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("invalid file type"));
    }
  },
};
