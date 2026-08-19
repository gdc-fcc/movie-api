import jwt from "jsonwebtoken"

const signToken = payload => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
const  verifyToken = token => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        return payload
    } catch(e) {
        return null
    }
}

export {signToken, verifyToken}