const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const jwtToken = req.headers["authorization"]?.split(" ")[1]
    if (!jwtToken) {
        return res.status(401).end()
    }
    jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).end()
        }
        req.user = decoded
        next()
    })
}

module.exports = auth