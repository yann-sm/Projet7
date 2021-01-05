const express = require('express');
//creation du router express 
const router = express.Router();
//controller pour associer les fonctions au differentes routes 
const userCtrl = require('../controllers/user');
//import du middlewares de validation
const auth = require('../middlewares/auth');

//route post
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
//route delete
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;