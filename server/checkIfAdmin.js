

async function checkAdmin(req, res, next) {
    if(req.user.userType!="admin"){
       return res.status(401).json({"message": "not authorized"})
    }
    next(); // Proceed to the next middleware or route handler
  
}

export default checkAdmin