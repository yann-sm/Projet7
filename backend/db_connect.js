/*Dotenv est un module sans dépandence.
utilisation du module dotenv pour masquer les informations de connexion à la base de données
avec des variables d'environnement : */
require('dotenv').config();
//import de mysql pour utilisé la base de données crée avec mysql
const mysql = require('mysql'); 

const connect = mysql.createConnection({
    host: "localhost",//process.env.DB_HOST, //localhost
    user: "root",//process.env.USER, //nom_utilisatgeur
    password: "Doudou35",//process.env.PASSWORD, //mot_de_passe_utilisateur ex: root ou Doudou35
    database: "Groupomania"//process.env.NAME //nom de la base de données
});

connect.connect(function(err){
    if(err){
        return console.error('error:' + err.message);
    }
    console.log('Connection à la base de données réussie !');
});

module.exports = connect;

/*
error:ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol 
requested by server; consider upgrading MySQL client
*/