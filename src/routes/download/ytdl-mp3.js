const express = require('express');
const ytdl = require('ytdl-core');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        creator: 'Ziooo',
        status: 400,
        result: { error: 'El parámetro q (URL de YouTube) es requerido' }
      });
    }

    const youtubeURL = url;
    const stream = await ytdl(youtubeURL, { filter: 'audioonly', quality: 'highestaudio' });

    const audioBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', chunk => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });

    res.set('Content-Type', 'audio/mp3');
    res.set('Content-Disposition', 'attachment; filename="audio.mp3"');
    res.send(audioBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      creator: 'Ziooo',
      status: 500,
      result: { error: 'Error al procesar la solicitud' }
    });
  }
});

module.exports = router;
