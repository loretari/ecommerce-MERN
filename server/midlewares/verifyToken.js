import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        console.log("No token provided")
            return res.status(400).json({message: "Not authorized. No token"})
    }

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
            if (error) {
                return res.status(403).json({message: "Wrong or expired toke"})
            } else {
                console.log("Token verified successfully:", data)
                req.user = data;
                next();
            }
        })
    } else {
        return res.status(401).json("Authorization failed.")
    }
}

export const verifyTokenAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("You are not authorized")
        }
    })

}

export const verifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not an admin therefor not authorized")
        }
    })
}