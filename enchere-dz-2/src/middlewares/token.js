const jwt = require('jsonwebtoken');



exports.userToken = (req, res, next) => {
 const token  = req.headers['authorization'];;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token "+error });
  }

}



exports.adminToken = (req, res, next) => {
  const token  = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token "+error });
  }
  }

  exports.serverToken = (req, res, next) => {
    // const token  = req.headers['authorization'];
    // if (!token) {
    //   return res.status(401).json({ message: "No token provided :"+token });
    // }
    // try {
    //   const decoded = "78heoytx56drg4ezd163dfjjs3";
    //   if (token != decoded) {
    //     return res.status(403).json({ message: "Access denied" });
    //   }
    //   return next();
    // } catch (error) {
    //   return res.status(401).json({ message: "Invalid token :"+error });
    // }
    next()
  }