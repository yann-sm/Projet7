const express = require('express');
//import de cors :
const cors = require('cors');
//on importe body-parser pour être capable d'extraire l'objet JSON d'une demande :
const bodyParser  = require('body-parser');
//import de path pour accédé au path de notre server :
const path = require('path');
//sécurité :
/*helmet pour la sécurité de l'app. Sécurise les requête http, les en-têtes, contrôle la prélécture DNS des navigateurs,
empêche le détournement de clics, ajoute une protection XSS, protège contre le reniflement type MIME,
cross-site scriping, sniffing et clickjacking : */
const helmet = require('helmet');
// Protège contre les failles XSS :
const expressSanitizer = require('express-sanitizer');
//import des routes :
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
//on créé l'application express :
const app = express();



//middleware :
/*- AJOUT DE HEADERS -
Ces headers permettent :
d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
});
app.use(cors());
//transforme les données de requête POST en objet JSON exploitable :
app.use(bodyParser.json());
/* Securité :*/
//helmet pour la sécurité de l'app :
app.use(helmet());
// Protège contre les failles XSS
app.use(expressSanitizer()); 

//route user
//app.use('/api/auth', userRoute);
//app.use('/api/posts', postRoute);
//route post
module.exports = app;