const express = require('express');
const path = require("path")
const bodyParser = require('body-parser');
const UserRoutes = require('./routes/user_route');
const AnnoncesRoutes = require('./routes/annonceRoutes');
const AbonnementsRoutes = require('./routes/abonnementRoutes');
const cors = require('cors');
const {secureApi} = require("./middlewares/secure")
const Abonnement = require("./models/Abonnement")

const app = express();


app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    bodyParser.json({
      verify: (req, res, buf) => {
        req.rawBody = buf;
      },
    })
);

console.log(path.join(__dirname, '/../uploads/images/watermarked'));

app.use('/api/images', express.static(path.join(__dirname, '/../uploads/images/watermarked')));
app.use('/api/videos', express.static(path.join(__dirname, '/../uploads/videos')));



app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/annonces',AnnoncesRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/abonnement', AbonnementsRoutes);

app.get("/",(req,res)=>{
  console.log(req.query.lang);
      console.log("sending index");

  
  if(req.query.lang && req.query.lang == 'fr') {

    res.sendFile(__dirname + "/public/indexfr.html");
  } else {
    res.sendFile(__dirname + "/public/indexar.html");
  }
});



app.get('/annonces/:id', (req, res) => {
  if(req.query.lang && req.query.lang === 'fr') {
    res.sendFile(__dirname + "/public/annonce-detaillsfr.html");
  } else {
    res.sendFile(__dirname + '/public/annonce-details.html');
  }
});

app.get("/login",(req,res)=>{
  if(req.query.lang && req.query.lang === 'fr') {
    res.sendFile(__dirname + "/public/loginfr.html");
  } else {
    res.sendFile(__dirname + "/public/login.html");
  }
});

app.get("/signup",(req,res)=>{
  if(req.query.lang && req.query.lang === 'fr') {
    res.sendFile(__dirname + "/public/signupfr.html");
  } else {
    res.sendFile(__dirname + "/public/signup.html");
  }
});

app.get("/ajouter-annonce",(req,res)=>{
  if(req.query.lang && req.query.lang === 'fr') {
    res.sendFile(__dirname + "/public/ajouter-annoncefr.html");
  } else {
    res.sendFile(__dirname + "/public/ajouter-annonce.html");
  }
});

app.get("/recherche",(req,res)=>{
  if(req.query.lang && req.query.lang === 'fr') {
    res.sendFile(__dirname + "/public/recherchefr.html");
  } else {
    res.sendFile(__dirname + "/public/recherche.html");
  }
});

app.get('/profile/:id',(req,res)=>{
  if(req.query.lang && req.query.lang === 'fr') {
    res.sendFile(__dirname + "/public/profilfr.html");
  } else {
    res.sendFile(__dirname + "/public/profile.html");
  }
});

app.get('/mon-abonnement',(req,res)=>{
  if(req.query.lang && req.query.lang === 'fr') {
    res.sendFile(__dirname+"/public/mon-abonnement-fr.html")
  }else {
    res.sendFile(__dirname+"/public/mon-abonnement.html")
  }
})

app.get('/payment',(req,res)=>{
  if(req.query.lang && req.query.lang === 'fr') {
    res.sendFile(__dirname+"/public/paimmentfr.html")
  }else {
    res.sendFile(__dirname+"/public/paimment.html")
  }
})

app.get("/dashboard",(req,res)=>{
  res.sendFile(__dirname+"/public/dashboard.html")
});

app.get("/admin-login",(req,res)=>{
  res.sendFile(__dirname+"/public/admin-login.html")
});

app.get("/loi",(req,res)=>{
  if(req.query.lang && req.query.lang === 'fr') {
    res.sendFile(__dirname+"/public/lois.html")
  }else {
    res.sendFile(__dirname+"/public/loisar.html")
  }
})

app.get("/payment-methodes",(req,res)=>{
  if(req.query.lang && req.query.lang === 'fr') {
    res.sendFile(__dirname+"/public/payment-methodefr.html")
  }else {
    res.sendFile(__dirname+"/public/payment-methode.html")
  }
})






module.exports = app;