
<template>
    <div class="userProfile">
        <h1>Bienvenu sur votre profile</h1>
        <div class="profile-info">
            <h2>Bonjour, </h2>
            <span>{{ this.$user.nom }}</span>
            <span>{{ this.$user.prenom }}</span>
        </div>
        <div class="delete-profile" @click="deleteUser()">Supprimer le compte</div>

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
    .delete-profile {
        margin-bottom: 30px;
        font-size: 6rem;
        cursor: pointer;
    }
</style>