const express = require('express')
const router = express.Router()

const COMMENTS_USER_LU = require('../../models/comments-lu')

router.get('/', async (req, res) => {
    try {
        const comments = await COMMENTS_USER_LU.find()
        res.status(200).json({
            status: 200,
            comments
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
})

router.post('/', async (req, res) => {
    try {
        const comment = await COMMENTS_USER_LU.create(req.body)
        res.status(200).json({
            status: 200,
            comment
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
})


router.post('/:id', async (req, res) => {
    try {
        const commentId = req.params.id;
        const { name, comment } = req.body;

        // Verifica que se proporcionen el nombre y el comentario
        if (!name || !comment) {
            return res.status(400).json({ error: 'Nombre y comentario son obligatorios.' });
        }

        // Encuentra el comentario por su ID
        const commentToUpdate = await COMMENTS_USER_LU.findById(commentId);

        // Si no se encuentra el comentario, devuelve un error
        if (!commentToUpdate) {
            return res.status(404).json({ error: 'Comentario no encontrado.' });
        }

        // Agrega la respuesta al comentario
        commentToUpdate.replyMsg.push({ name, comment });
        await commentToUpdate.save();

        res.status(200).json({ status: 200, message: 'Respuesta agregada correctamente.' });
    } catch (error) {
        console.error('Error al agregar respuesta:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

router.post('/:commentId/like', async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const comment = await COMMENTS_USER_LU.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                status: 404,
                error: 'Comentario no encontrado'
            });
        }

        // Incrementar el contador de likes y marcar como liked
        comment.likes++;
        comment.liked = true;
        await comment.save();

        res.status(200).json({
            status: 200,
            message: 'Like agregado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const comment = await COMMENTS_USER_LU.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            status: 200,
            comment
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
})

module.exports = router;