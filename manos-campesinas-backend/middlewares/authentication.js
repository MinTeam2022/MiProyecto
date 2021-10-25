const { User } = require('../models')

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(400).json({ message: "Authentication required" })
        }
        const id = req.headers.authorization
        const user = await User.findOne({ where: { googleId: id } })

        if (!user) {
            res.status(403).json({ message: "Forbidden" })
        }
        else {
            res.locals.role = user.role
            next()
        }
    } catch (error) {
        res.status(403).json({ message: "Forbidden" })
    }
}