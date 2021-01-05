const mysql = require('mysql'); //installé


const connect = mysql.createConnection({
    host: "localhost", //localhost
    user: "root", //nom_utilisatgeur
    password: "root", //mot_de_passe_utilisateur
    database: "Groupomania" //nom de la base de données
});

connect.connect(function(err){
    if(err){
        return console.error('error:'+err.message);
    }
    console.log('Connection à la base de données réussie !');
});

module.exports = connect;