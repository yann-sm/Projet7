const mysql = require('mysql'); 


const connect = mysql.createConnection({
    host: "localhost", //localhost
    user: "root", //nom_utilisatgeur
    password: "Doudou35", //mot_de_passe_utilisateur ex: root ou Doudou35
    database: "Groupomania" //nom de la base de données
});

connect.connect(function(err){
    if(err){
        return console.error('error:'+err.message);
    }
    console.log('Connection à la base de données réussie !');
});

module.exports = connect;
/*
//autre façon de se connecter a la base de données 

exports.connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Doudou35', //ou root
    database: 'Groupomania';
    timezone: 'local';
    charset: 'utf8mb4'
});
*/