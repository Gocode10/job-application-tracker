const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

async function authMiddleware(req,res,next){
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Kindly login to continue' })
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token,secret);
        if(!decoded){
            return res.status(401).json({msg: 'Token is not valid'});
        }
        
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid'});  
    }
     
}

module.exports = authMiddleware