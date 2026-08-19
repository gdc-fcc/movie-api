const authorizeModification = (req, res, next) => {
    const isParent = req.user.role == "parent"
    const isChild = req.user.role == "child"
    const isOwner = req.params.userId == req.user.user
    const unknownRole = !isParent && !isChild
    if (unknownRole || isChild && !isOwner) {
        return res.status(403).json({"error": "Access denied"})
    }
    // parse params
    req.userId = parseInt(req.params.userId)
    req.movieId = parseInt(req.params.movieId)
    next()
}

export {authorizeModification}