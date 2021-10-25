module.exports = async (req, res, next) => {
    if (!res.locals.role) {
        res.status(400).json({ message: "Authentication required" })
    }
    res.locals.role == "admin" || "vendedor" ? next() : next("Forbidden")
}