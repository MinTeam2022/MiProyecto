module.exports = async (req, res, next) => {
    if (!req.role) {
        res.status(400).json({ message: "Authentication required" })
    }
    res.locals.role == "admin" ? next() : next("Forbidden")
}