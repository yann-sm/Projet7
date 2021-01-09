//les routes sont enregistré dans le dossier routes. les fonctions associées se trouve dans le dossier controllers -
const express = require('express');
const router = express.Router();

//on associe les fonction au différentes route de produit en important les controllers :
const userCtrl = require('../controllers/post');
//import des middlewares :
const auth = require('../middlewares/auth');

//route get
router.get('/', auth, userCtrl.getAllPost);
router.get('/:id', auth, userCtrl.getOnePOst);
router.get('/:id/comments', auth, userCtrl.getAllComments);
router.get('/user:id/posts', auth, userCtrl.getUserPosts);
//route post
router.post('/', auth, userCtrl.newPost);
router.post('/:id/comment', auth, userCtrl.newComment);
//route put
router.put('/:id', auth, userCtrl.modifyOnePost);
//route delete
router.delete('/:id', auth, userCtrl.deleteOnePost);
router.delete('/comment/:id', auth, userCtrl.deleteComment);


module.exports = router;