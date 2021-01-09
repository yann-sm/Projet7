//import des info de connection à la base de données
const db = require("../db_connect");

//fonction pour récupérer tous les posts //OK
exports.getAllPost = (req, res, next) => {
    db.query(`SELECT users.nom, users.prenom, posts.id, posts.userId, posts.title, posts.content, posts.dateCreate AS date FROM users INNER JOIN posts ON users.id = posts.userId ORDER BY date DESC`,
    (error, result, field) => {
        if(error){
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};

//fonction pour les nouveau post //OK
exports.newPost = (req, res, next) => {
    db.query(`INSERT INTO posts VALUES (NULL, '${req.body.userId}', '${req.body.title}', NOW(), '${req.body.content}')`,
    (error, result, field) => {
        if(error){
            return res.status(400).json({ error });
        }
        return res.status(201).json({ message: 'Votre post à été publié !'})
    });
};

//fonction pour récupérer un seule post //OK
exports.getOnePOst = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE posts.id = ${req.params.id}`,
    //connection à la ddb et on demande de tous selectionner depuis la table posts ou l'id est égale à l'id mappé.
    (error, result, field) => {
        if(error){
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};

//fonction pour supprimer un post // OK
exports.deleteOnePost = (req, res, next) => {
    db.query(`DELETE FROM posts WHERE posts.id = ${req.params.id}`,
    (error, result, field) => {
        if(error){
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};

//fonction pour modifier un post //OK
exports.modifyOnePost = (req, res, next) => {
    db.query(`UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' WHERE posts.id = '${req.params.id}'`,
    (error, result, field) => {
        if(error){
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};

//fonction pour les nouveaux commentaires  //OK
exports.newComment = (req, res, next) => {
    db.query(`INSERT INTO comments VALUES (NULL, ${req.body.userId}, ${req.params.id}, '${req.body.content}', NOW())`,
    (error, result, field) => {
        if(error){
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};

//fonction pour récupérer tous les commentaires //OK
exports.getAllComments = (req, res, next) => {
    db.query(`SELECT users.id, users.nom, users.prenom, comments.id, comments.content, comments.userId, comments.dateCreate FROM users INNER JOIN comments ON users.id = comments.userId WHERE comments.postId = ${req.params.id} ORDER BY comments.dateCreate DESC`,
    (error, result, field) => {
        if(error){
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};

//fonction pour supprimer un commentaire //OK
exports.deleteComment = (req, res, next) => {
    db.query(`DELETE FROM comments WHERE comments.id = ${req.params.id}`,
    (error, result, field) => {
        if(error){
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};

//fonction pour récupérer les post d'un utilisateur //OK
exports.getUserPosts = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE posts.userId = ${req.params.id}`,
    (error, result, field) => {
        if(error){
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
}