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
    return res.status(201).json({message: "Added movie"})
})

export default route
