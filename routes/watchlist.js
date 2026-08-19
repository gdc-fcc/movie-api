import express from "express"
import * as db from "../utils/db.js"
import {authenticate} from "../middleware/authenticate.js"
import {authorizeModification} from "../middleware/authorize.js"

const route = express.Router()

route.use(authenticate)
route.get("/:userId", (req, res) => {
    const userId = req.params.userId
    return res.status(200).json(db.getWatchlist(parseInt(userId)))
})

route.post("/:userId/movies", authorizeModification, (req, res) => {
    const movie = db.addMovie(req.userId, req.body)
    if (movie === null) {
        return res.status(404).json({message: "User does not exist"})
    } else {
        return res.status(201).json({message: "Added movie", movie})
    }
})

route.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const movie = db.updateMovie(req.userId, req.movieId, req.body)
    if (movie === null) {
        return res.status(404).json({message: "Movie to update was not found"})
    } else {
        return res.status(200).json({message: "Movie successfully updated", movie})
    }
})

route.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
    const deleted = db.deleteMovie(req.userId, req.movieId)
    if (!deleted) {
        return res.status(404).json({message: "Resource to delete was not found"})
    } else {
        return res.status(200).json({message: "Deleted movie"})
    }
})

export default route
