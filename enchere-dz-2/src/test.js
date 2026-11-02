const express = require('express');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;


// Paths
const IMAGES_DIR = path.join(__dirname, '../uploads/images/original/before.jpeg');
const LOGO_PATH = path.join(__dirname, '../uploads/images/logo.png');

app.get('/watermark', async (req, res) => {
  

  const inputPath = path.join(IMAGES_DIR, '');

  if (!fs.existsSync(inputPath)) {
    return res.status(404).send('Image not found');
  }

  try {
    const baseImage = sharp(inputPath);
    const { width, height } = await baseImage.metadata();

    const logoBuffer = await sharp(LOGO_PATH)
      .resize({ width: Math.floor(width * 0.25) }) // logo = 25% of main width
      
      .png()
      .toBuffer();

    const logoMeta = await sharp(logoBuffer).metadata();

    const left = Math.floor((width - logoMeta.width) / 2);
    const top = Math.floor((height - logoMeta.height) / 2);

    const outputBuffer = await baseImage
      .composite([{ input: logoBuffer, top, left }])
      .png()
      .toBuffer();

    res.set('Content-Type', 'image/png');
    res.send(outputBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing image');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} directory ${IMAGES_DIR}`);
});
