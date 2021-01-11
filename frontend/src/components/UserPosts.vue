

<template>
    <div class="userPost">
        <div v-for="post in posts" :key="post.id">
            <router-link :to="{ name: 'Post', params: { id: post.id }}">
                <div class="post">
                    {{ post.title }} 
                    <div class="post-date">
                        <span>Posté le {{ dateFormat(post.dateCreate) }}</span>
                    </div>
                    
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
/*
Axios est une bibliothèque Javascript fonctionnant comme un client Http.
Elle permet de communiquer avec des APIen utilisant des requêtes.
*/
import axios from 'axios';

export default {
    name: 'UserPosts',
    data(){
        return{
            posts: []
        }
    }, 
    mounted(){
        this.getUserPosts();
    },

    methods:{
        getUserPosts(){
            const userId = this.$user.userId;

            axios.get(`${this.$apiUrl}/posts/user${userId}/posts`,
            {
                headers:{
                    'Content-Type': 'application/json',//attend un format json
                    'Authorization': `Bearer ${this.$token}`//authentification par un token
                }
            })
            .then(res => this.posts = res.data)
        },

        dateFormat(date){
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-FR', options);
        }
    }
}
</script>

<style scoped>
    .userPost {
        margin: 30px auto;
        max-width: 800px;
    }
    .post {
        padding: 20px 20px 20px 30px;
        margin-top: 20px;
        text-align: left;
        transition-duration: .1s;
        border: 1px solid black;
        border-radius: 10px;
    }
    .post:hover {
        box-shadow: 2px 2px 5px black;
        border: 1px solid red;
    }
   
</style>