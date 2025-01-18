import jwt from 'jsonwebtoken'

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try{
    const decoded= jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    }
    catch{
        return res.status(498).json({ message: 'invalid token' });
    }
    const userId=decoded["userId"]
    const userType=decoded["userType"]
    req.user = {userId,userType} // Attach the decoded user payload to the request
    next(); // Proceed to the next middleware or route handler
  
}

export default authenticateToken