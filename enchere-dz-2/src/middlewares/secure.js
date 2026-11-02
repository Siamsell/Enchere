const allowedOrigin = 'https://enchere-dz.com';


 exports.secureApi = (req, res, next)=>{
 
  // const referer = req.headers.referer;
  // console.log('Referer header:', referer);

  // if (!referer) {
  //     return res.status(403).json({ error: 'Forbidden Request' });
  // }
  
  // if(referer.includes(allowedOrigin)){
  //   next();
  // }else{
  //   return res.status(403).json({ error: 'Forbidden Request' });

  // }  

  next()
};


