const multer = require("multer");

class FileUploader {
  constructor(options) {
    // set default options
    this.options = {
      fileSize: 5 * 1024 * 1024, // 5MB
      fileTypes: ["image/png", "image/jpeg", "image/gif"],
      storageType: "memory", // 'memory' or 'disk'
      storagePath: "uploads/",
    };
    // override default options with user-specified options
    Object.assign(this.options, options);
    // set storage based on storageType option
    let storage;
    if (this.options.storageType === "memory") {
      storage = multer.memoryStorage();
    } else if (this.options.storageType === "disk") {
      storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, this.options.storagePath);
        },
        filename: (req, file, cb) => {
          let fileName =
            options.fileName || `${Date.now()}-${file.originalname}`;
          if (options.changeFileName) {
            fileName = options.changeFileName(file);
          }
          cb(null, fileName);
        },
      });
    }

    this.upload = multer({
      storage: storage,
      limits: {
        fileSize: this.options.fileSize,
      },
      fileFilter: (req, file, cb) => {
        if (options.fileTypes) {
          if (!this.options.fileTypes.includes(file.mimetype)) {
            return cb(new Error("Invalid file type"));
          }
        }
        cb(null, true);
      },
    });
  }

  single(field) {
    return this.upload.single(field);
  }

  multiple(field, maxCount) {
    return this.upload.array(field, maxCount);
  }

  fields(fields) {
    return this.upload.fields(fields);
  }

  none(req, res, next) {
    if (!req.files || !req.files.length) {
      return next();
    }
    next(new Error("No files are allowed to be uploaded"));
  }

  handleError(error, req, res, next) {
    if (error) {
      next(error);
    } else {
      next();
    }
  }
}

module.exports = FileUploader;
