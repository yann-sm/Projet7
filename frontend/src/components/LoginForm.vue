
<template>
    <div class="wrapper">
        <img src="../assets/logo_black.png" alt="logo groupomania">
        <nav>
            <router-link to="/" class="active">Se connecter</router-link> | 
            <router-link to="/Signup">S'inscrire</router-link>
        </nav>
        <form @submit.prevent= login()>
            <label for="login-email">Email :</label>
            <input id="login-email" type="text" placeholder="email" required>

            <label for="login-password">Mot de passe :</label>
            <input id="login-password" type="password" placeholder="Mot de passe" required>

            <div class="error-message">{{ message }}</div>

            <button id="login-btn" type="submit">Connexion</button>
        </form>
           
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginForm',
    data(){
        return{
            message: "",
        };
    },
    methods:{
        login(){//methode pour la connection
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            axios.post(`${this.$apiUrl}/auth/login`,
            {
                email,
                password
            },{
                headers: {'Content-Type': 'application/json'}//format de données de la requête
            })
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                location.reload();
            })
            .catch((error) => {
                if(error.response.status === 404){
                    this.message = "Utilisateur inconnu";
                }
                if(error.response.status === 401){
                    this.message = "Email ou mot de passe incorrecte";
                }
            });
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
        /*box-shadow: -1px 0px 5px #2c3e50;*/
    }
    nav {
        font-size: 1.05rem;
        margin: 20px;
    }
    .active {
        font-weight: bold;
        font-size: 1.3rem;
        color: #42b983;
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
    #login-btn {
        background-color: black;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        border: 1px solid black;
        border-radius: 5px;
        cursor: pointer;
    }
    #login-btn:hover {
        background-color: red;
        color: black;
    }
</style>