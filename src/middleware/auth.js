const DATA_TOKEN_DB = require('../models/token');

const authenticate = async (req, res, next) => {
    const apikey = req.query.apikey

    if (!apikey) {
        return res.status(401).json({
            message: 'No apikey provided'
        })
    }
    try {
        const valid = await DATA_TOKEN_DB.findOne({ apikey })
        if (!valid) {
            return res.status(401).json({
                message: 'Invalid apikey provided'
            })
        }
        req.user = { name: valid.name }
        next()
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid apikey provided'
        })
    }
}

module.exports = authenticate