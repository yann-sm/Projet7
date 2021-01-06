<template>
    <div class="wrapper">
        <form @submit.prevent= signup()>
            <img src="../assets/icon-left-font-monochrome-black.png" alt="logo groupomania">
            <nav>
                <router-link to="/">Se connecter</router-link> | 
                <router-link to="/Signup" class="active" >S'inscrire</router-link>
            </nav>
            <label for="signup-nom">Nom :</label>
            <input id="signup-nom" type="text" placeholder="Nom" required>

            <label for="signup-prenom">Prénom :</label>
            <input id="signup-prenom" type="text" placeholder="Prenom" required>

            <label for="signup-email">Email :</label>
            <input id="signup-email" type="email" placeholder="Email" required>

            <label for="signup-password">Mot de passe :</label>
            <input id="signup-password" type="password" placeholder="Mot de passe" required>

            <label for="signup-password-verification">Vérification du mot de passe :</label>
            <input id="signup-password-verification" type="password" placeholder="Mot de passe" required>

            <div class="error-message">{{ message }}</div>

            <button id="signup-btn" type="submit">S'inscrire</button>
        </form>    
    </div>
</template>

<script>
/*
Axios est une bibliothèque Javascript fonctionnant comme un client Http.
Elle permet de communiquer avec des API en utilisant des requêtes client http basé sur les promesses,.
*/
import axios from 'axios';

export default {
    name: 'SignupForm',
    data(){
        return{
            message: "",
        };
    },
    methods:{//method pour l'inscription
        signup(){
            const nom = document.getElementById("signup-nom").value;
            const prenom = document.getElementById("signup-prenom").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;
            const passwordVerif = document.getElementById("signup-password-verification").value;

            if(password === passwordVerif){//si password est egal à passwordVerif
                axios.post(`${this.$apiUrl}/auth/signup`,
                {
                    nom,
                    prenom,
                    email,
                    password
                },{
                    headers: {'Content-Type': 'application/json'}//format de données de la requête
                })
                .then(res => {//on traite la suite une fois la réponse obtenue
                    if(res.status === 201){
                        location.href = '/';
                    }
                })
                .catch((error) => {//on trite ici les erreurs éventuellement survenues
                    if(error.response.status === 401){
                        this.message = "Email non disponible.";
                    }
                });
            }
            else if(password != passwordVerif){//et si password est difféerent de passwordVerif  
                this.massage = "Vérifier le mot de passe";
            }
        }
    }
}
</script>

<style scoped>
    .wrapper {
        max-width: 500px;
        margin: 0px auto;
    }
    img {
        width: 100%;
        box-shadow: -1px 0px 5px red;
    }
    nav {
        font-size: 1.05rem;
        margin: 20px;
    }
    .active {
        text-shadow: 0px 4px 5px #42b983;
        font-weight: bold;
        font-size: 1.3rem;
        
    }
    form {
        display: flex;
        flex-direction: column;
    }
    form label {
        font-weight: bold;
    }
    form input {
        text-align: center;
        padding: 5px;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid black;
    }
    
    #signup-btn {
       background-color: black;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        border: 1px solid black;
        border-radius: 5px;
        cursor: pointer;
    }
    #signup-btn:hover {
        background-color: red;
        color: black; 
    }
</style>