import express from "express"
import {getWatchlist} from "../utils/db.js"

const route = express.Router()

route.get("/:userId/movies", (req, res) => {
    const userId = req.params.userId
    return res.status(200).json(getWatchlist(parseInt(userId)))
})

export default route
