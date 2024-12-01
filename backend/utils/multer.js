const multer = require('multer')
const path = require('path')
// const storage = multer.diskStorage({
//     filename: function(req, file, callback){
//         callback(null, file.originalname)
//     }
// })

// let upload = multer({storage})

// module.exports = upload


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const isTrust = req.baseUrl.includes('/trust');
//       const uploadsPath = isTrust 
//       ? path.join(__dirname, '../uploads/trust') // Separate folder for Trust
//       : path.join(__dirname, '../uploads/user'); // Separate folder for User

//       // if it is going to store images in one folder then use below code
//       //   const uploadsPath = path.join(__dirname, '../uploads');
//       cb(null, 'uploads/'); // Directory to store uploaded files
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
//     },
//   });

  // for cluster
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