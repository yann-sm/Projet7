
<template>
    <div class="userProfile">
        <div class="delete" @click="visible=true">
            <pan>Suprimer votre compte</pan>
        </div>
        <div class="profile-info">
            <h2>Bienvenue sur votre compte, </h2>
            <span>{{ this.$user.nom }}</span>
            <span>{{ this.$user.prenom }}</span>
        </div>
        <div v-if="visible">
            <span class="delete-close" @click="visible=false">Je ne souhaite pas supprimer mon compte</span>
           <div class="delete-profile" @click="deleteUser()">Supprimer votre compte ?</div> 
        </div>
        

        <h3>Vos posts :</h3>
    </div>
</template>

<script>
/*
Axios est une bibliothèque Javascript fonctionnant comme un client Http.
Elle permet de communiquer avec des APIen utilisant des requêtes.
*/
import axios from 'axios';

export default {
    name: 'UserProfile',
    data(){
        return{
            visible: false, 
        }
    },
    methods:{
        deleteUser(){//methode supprimer un utilisateur
            const userId = this.$user.userId;

            axios.delete(`${this.$apiUrl}/auth/${userId}`,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
            .then(this.visible = false)
            .then(localStorage.removeItem('user'))
            .then(location.href = "/");
        }
    }
}
</script>

<style scoped>
    .profile-info {
        margin: 50px auto;
        max-width: 800px;
    }
    .profile-info h2 {
        margin-bottom: 20px;
        font-size: 3rem;
    }
    .profile-info span {
        font-size: 3rem;
    }
    .delete {
        position: absolute;
        margin-top: -30px;
        margin-left: 50%;
        transition-duration: 0.2s;
    }
    .delete:hover {
        color: red;
        font-weight: bold;
        box-shadow: 1px 1px 0px black;
        padding: 5px;
        border-radius: 5px;
    }
    .delete-close {
        font-weight: bold;
        color: red;
        cursor: pointer;
        transition-duration: 0.2s;
    }
    .delete-close:hover {
       /*box-shadow: 1px -1px 2px black;*/
        background-color: white;
        font-size: 1.7rem;
        padding: 5px;
        border-radius: 5px;
        position: relative;
        z-index: 2;
    }
    .delete-profile {
        margin-bottom: 30px;
        font-size: 2rem;
        font-weight: bold;
        background-color: black;
        cursor: pointer;
        border: 1px solid black;
        border-radius: 10px;
        text-shadow: 1px 1px 1px white;
    }
    .delete-profile:hover {
        color: red;
    }
</style>