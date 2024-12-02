const multer = require('multer')
const path = require('path')

  const storage = multer.memoryStorage();
  
  // File filter to allow only images
  const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
    }
  };
  
  // Configure multer
  const upload = multer({
    storage,
    // limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
    fileFilter,
  });
  
  module.exports = upload;