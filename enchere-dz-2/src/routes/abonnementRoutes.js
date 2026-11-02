const router = require('express').Router();
const {createAbonnnement,deleteAbonnnement,userAbonnment,updateAbonnement,getAllAbonnment,activeAbonnement} = require('../controllers/abonnement_controller');

router.post("/",createAbonnnement);
router.put("/:id",updateAbonnement);
router.delete("/:id",deleteAbonnnement);
router.get("/user/:user_id",userAbonnment);
router.get("/",getAllAbonnment);
router.get("/active/:user_id",activeAbonnement);

module.exports = router;
