//import de bcrypt :
const bcrypt = require('bcrypt'); 
//import de jsonwebtoken pour créer et vérifier les tokens d'authentifications:
const jwt = require('jsonwebtoken'); 
//import base de données :
const db = require('../db_connect');
//import de js-base64 pour encodé l'email en base 64 :
const { encode } = require('js-base64');

//fonction pour l'enregistrement de nouveau utilisateurs : //OK
exports.signup = (req, res, next) => {
    //cryptage de l'email
    const emailCrypted = encode(req.body.email);//encodage de l'email en base 64
    //verif si email disponible
    db.query(`SELECT * FROM users WHERE email='${emailCrypted}'`,
        (err, results, rows) => {
            //si déjà utilisé
            if(results.length > 0){
                res.status(401).json({
                    message: 'Email non disponble, veuillez en choisir un autre ..'
                });
            }else{
            //si l'email est disponible, cryptage du mot de passe
            //appelle de la fonction de hashage du mot de passe pour le securiser,
            //la fonction asynchrone hash nous renvoie une promise dans lequelle se trouve le hash généré 
            bcrypt.hash(req.body.password, 10)
                .then(passwordCrypted => {
                db.query(`INSERT INTO users VALUES (NULL, '${req.body.nom}', '${req.body.prenom}', '${passwordCrypted}', '${emailCrypted}')`,
                    (err, results, fields) =>{
                        if(err){
                            console.log(err);
                            return res.status(400).json("erreur");
                        }
                        return res.status(201).json({
                            message: "Création de votre compte !"
                        });
                    });
                })
                .catch(error => res.status(500).json({ error }));
            }
        })
};

//fonction pour connecter des utilisateurs existant :
exports.login = (req, res, next) => {
    //cryptage de l'email
    const emailCrypted = encode(req.body.email);
    //recherche de l'utilisateur dans la base de données
    db.query(`SELECT * FROM users WHERE email='${emailCrypted}'`,
        (err, results, rows) => {
            //si utilisateur trouvé 
            if(results.length > 0){
                //verification du mot de passe
                bcrypt.compare(req.body.password, results[0].password)
                .then(valid => {
                    //si le mot de passe n'est pas valide
                    if(!valid){
                        res.status(401).json({ message: "Mot de passe incorrect !"});
                    }else{//si mot de passe valide, création d'un token 
                        res.status(200).json({
                            userId: results[0].id,
                            nom: results[0].nom,
                            prenom: results[0].prenom,
                            token: jwt.sign(
                                { userId: results[0].id},
                                'RANDOM_TOKEN_SECRET',//clé de cryptage test
                                { expiresIn: '24h' }//chaque token durera 24h
                            )
                        });
                    }
                });
            }else{
                res.status(404).json({ message: "Utilisateur inconnu !"});
            }
        });
};

//fonction pour supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
    db.query(`DELETE FROM users WHERE users.id = ${req.params.id}`,
    (error, result, field) => {
        if(error){
            return res.status(400).json({ error });
        }
        return res.status(200).json(result);
    });
};