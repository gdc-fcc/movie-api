const authorizeModification = (req, res, next) => {
    const role = req.user.role || req.user.rule
    const id = req.user.user || req.user.id
    const isParent = role == "parent"
    const isChild = role == "child"
    const isOwner = req.params.userId == id
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