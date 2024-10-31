import multer from 'multer';

const memoryStorage = multer.memoryStorage();

export const upload = multer({
  storage: memoryStorage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
