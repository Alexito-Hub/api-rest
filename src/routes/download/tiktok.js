const { Router } = require('express');
const axios = require('axios');

const router = new Router();

router.get('/', async (req, res) => {
  try {
    const { url } = req.query
    const apiUrl = `https://api.tiklydown.eu.org/api/download?url=${url}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    const result = {
      creator: 'Zioo',
      status: '200',
      result: {
        author: {
          name: data.author.name,
          unique_id: data.author.unique_id,
          signature: data.author.signature,
        },
        music: {
          title: data.music.title,
          duration: data.music.durationFormatted,
          url: data.music.play_url,
        },
        information: {
          title: data.title,
          created_at: data.created_at,
          likeCount: data.stats.likeCount,
          commentCount: data.stats.commentCount,
          shareCount: data.stats.shareCount,
          playCount: data.stats.playCount,
          saveCount: data.stats.saveCount,
        }
      }
    };

    result.result.type = "unknown";

    if (data.video) {
      result.result.type = "video"; 
      result.result.video = {
        noWatermark: data.video.noWatermark,
        watermark: data.video.watermark,
        cover: data.video.cover,
        dynamic_cover: data.video.dynamic_cover,
        origin_cover: data.video.origin_cover,
        width: data.video.width,
        height: data.video.height,
        durationFormatted: data.video.durationFormatted,
        duration: data.video.duration,
        ratio: data.video.ratio,
      };
    }

    if (data.images && data.images.length > 0) {
      result.result.type = "images";
      result.result.images = data.images.map((image, index) => ({
        number: index + 1, 
        url: image,
      }));
    }

    res.setHeader('Content-Type', 'application/json');
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      creator: 'Zioo', 
      status: 500, 
      message: '[!] ' + error 
    });
  }
});

module.exports = router;
