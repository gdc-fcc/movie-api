import express from "express"
import {findByUsername} from "../utils/db.js"
import {signToken} from "../utils/jwt.js"

const route = express.Router()

route.post("/login", (req, res) => {
    if (!req.body) {
        return res.status(400).json({error: "username or password missing"})
    }
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).json({error: "username or password missing"})
    }
    const user = findByUsername(username)
    // TODO: check against hashed password. Needs rehashing
    if (user === [] || user._password != password) {
        return res.status(401).json({error: "invalid credentials"})
    }
    const token = signToken({id: user.id, rule: user.role})
    res.status(200).json({"messgae": "login successfull", token})
})

export default route
