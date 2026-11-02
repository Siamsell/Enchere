const router = require('express').Router();
const controller = require('../controllers/annonce_controller');
const uploadMiddleware = require('../middlewares/upload'); 

router.post('/create',uploadMiddleware,controller.addAnnonce);
router.post('/',controller.getAnnonces);
router.post('/suggest',controller.searchAnnonces);
router.get('/details/:id', controller.getAnnonceDetails);
router.get('/getAll', controller.getAdmineAnnonces);
router.get('/statistique', controller.statistique);
router.get('/user/:id', controller.getMyAnnonces);
router.put('/:id', controller.updateAnnonce);
router.delete('/:id', controller.deleteAnnonce);
router.get("/admin", controller.getAdmineAnnonces);

module.exports = router;
