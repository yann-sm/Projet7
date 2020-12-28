<template>
    <div class="wrapper">
        <form @submit.prevent=signup()>
            <img src="/asset/icon.png" alt="logo groupomania">
            <nav>
                <router-link to="/">Se connecter</router-link> | 
                <router-link to="/signup">S'inscrire</router-link>
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
        </form>    
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SignupForm',
    data(){
        return{
            message: "",
        };
    },
    methods:{
        signup(){
            const nom = document.getElementById("signup-nom").value;
            const prenom = document.getElementById("signup-prenom").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;
            const passwordVerif = document.getElementById("signup-password-verification").value;

            if(password === passwordVerif){
                axios.post(`${this.$apiUrl}/auth/signup`,
                {
                    nom,
                    prenom,
                    password,
                    email
                },{
                    headers: {'content-Type': 'application/json'}
                })
                .then(res => {
                    if(res.status ==201){
                        location.href = '/';
                    }
                })
                .catch((error) => {
                    if(error.response.status === 401){
                        this.message = "Email non disponible.";
                    }
                });
            }
            else if(passwordVerif != passwordVerif){
                this.massage = "Vérifier le mot de passe";
            }
        }
    }
}
</script>

<style scoped>
    .wrapper {
        max-width: 500px;
        margin: 90px auto;
    }
    img {
        width: 100%;
    }
    nav {
        font-size: 1.05rem;
        margin: 20px;
    }
</style>