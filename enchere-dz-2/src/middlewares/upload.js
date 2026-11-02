const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Temp upload directory
const TMP_DIR = path.join(__dirname, '../../uploads/tmp');
const LOGO_PATH = path.join(__dirname, '../../uploads/images/logo.png');

// Final storage locations
const WATERMARKED_DIR = path.join(__dirname, '../../uploads/images/watermarked');
const VIDEO_DIR = path.join(__dirname, '../../uploads/videos');

// Ensure all needed folders exist
[ TMP_DIR, WATERMARKED_DIR, VIDEO_DIR ].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Multer storage: files go to temp first
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TMP_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    cb(null, name);
  }
});

const upload = multer({ storage });

// Main processing middleware
const handleUpload = (req, res, next) => {
  upload.array('medias', 10)(req, res, async err => {
    if (err) return next(err);

    try {
      const logoBuffer = await sharp(LOGO_PATH)
        .resize({ width: 200 }) // default, will be resized per image
        .png()
        .toBuffer();

      for (const file of req.files) {
        const ext = path.extname(file.originalname).toLowerCase();
        const mime = file.mimetype;
        const isImage = /^image\//.test(mime);
        const isVideo = /^video\//.test(mime);

        const tmpPath = file.path;

        if (isImage) {
          const outputPath = path.join(WATERMARKED_DIR, file.filename);

          const baseImage = sharp(tmpPath);
          const { width, height } = await baseImage.metadata();

          const resizedLogo = await sharp(logoBuffer)
            .resize({ width: Math.floor(width * 0.25) })
            .toBuffer();

          const logoMeta = await sharp(resizedLogo).metadata();
          const left = Math.floor((width - logoMeta.width) / 2);
          const top = Math.floor((height - logoMeta.height) / 2);

          await baseImage
            .composite([{ input: resizedLogo, top, left }])
            .toFile(outputPath);

          //fs.unlinkSync(tmpPath); // remove original temp  hadi tnahi les fichier original apres mtdirilhm logo 
          file.path = outputPath;

        } else if (isVideo) {
          const outputPath = path.join(VIDEO_DIR, file.filename);
          fs.renameSync(tmpPath, outputPath);
          file.path = outputPath;

        } else {
          // Unsupported file type
          fs.unlinkSync(tmpPath);
          return res.status(400).json({ error: `Unsupported file type: ${file.originalname}` });
        }
      }

      next();

    } catch (error) {
      console.error('Error processing upload:', error);
      return res.status(500).json({ error: 'Failed to process uploaded files.' });
    }
  });
};

module.exports = handleUpload;
