import express from "express"
import * as db from "../utils/db.js"
import {authenticate} from "../middleware/authenticate.js"

const route = express.Router()

route.use(authenticate)
route.get("/:userId", (req, res) => {
    const userId = req.params.userId
    return res.status(200).json(db.getWatchlist(parseInt(userId)))
})

export default route
