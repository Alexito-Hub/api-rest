const { Router } = require('express');
const ytdl = require('ytdl-core');
const router = new Router();

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
    const stream = await ytdl(youtubeURL, { filter: 'audioandvideo', quality: 'highestvideo' });

    res.set('Content-Type', 'video/mp4');
    stream.pipe(res);
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
