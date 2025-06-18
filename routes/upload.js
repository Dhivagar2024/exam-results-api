const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const minioClient = require('../minioClient');
const { User } = require('../models');

const router = express.Router();
const BUCKET = 'user-profiles';

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload/:userId', upload.single('profile'), async (req, res) => {
  try {
    const { userId } = req.params;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.profileImageEtag) {
      return res.status(403).json({ error: 'Profile photo already exists and cannot be updated' });
    }

    const buffer = await sharp(file.buffer).resize(300, 300).jpeg().toBuffer();
    const fileName = `${userId}_${Date.now()}.jpg`;

    minioClient.putObject(BUCKET, fileName, buffer, async (err, objInfo) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to upload to MinIO', details: err.message });
      }

      const etag = typeof objInfo === 'object' && objInfo.etag ? objInfo.etag : String(objInfo);

      try {
        await User.update(
          {
            profileImage: fileName,
            profileImageEtag: etag,
          },
          { where: { id: userId } }
        );

        return res.status(200).json({
          message: 'Upload successful',
          fileName,
          etag,
        });
      } catch (updateErr) {
        return res.status(500).json({ error: 'Failed to update user record', details: updateErr.message });
      }
    });

  } catch (err) {
    return res.status(500).json({ error: 'Unexpected error', details: err.message });
  }
});

module.exports = router;
