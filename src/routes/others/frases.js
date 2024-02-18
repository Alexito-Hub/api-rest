require('../../config')
const { Router } = require('express');
const router = new Router();
const fs = require('fs/promises');
const path = require('path');

const config = require('../../config');
const lifePath = path.join(__dirname, '../../json/frases.json');

router.get('/', async (req, res) => {
  try {
    const lifeData = await fs.readFile(lifePath, 'utf-8');
    const lifeTips = JSON.parse(lifeData);

    const random = lifeTips[Math.floor(Math.random() * lifeTips.length)];

    res.status(200).json({
      creator: global.name,
      status: 200,
      result: {
        quoted: random.quoted,
        libro: random.libro,
        autor: random.autor
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      creator: global.name,
      status: 500,
      result: { error: 'Error al obtener los mensajes' }
    });
  }
});

module.exports = router;
