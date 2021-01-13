
<template>
    <div class="posts">
        <h1>Dernière publications :</h1><!--Titte a supprimer-->
        <article class="post" v-for="post in posts" :key="post.id">
            <router-link :to="{ name: 'Post', params: { id: post.id} }">
                <div class="post-header">
                    <span class="post-info">Par {{ post.nom }} {{ post.prenom }} - Posté le {{ dateFormat(post.date) }} </span>
                    <span class="post-modify" v-if="post.userId === $user.userId">Modifier</span>
                </div>
                <h2 class="post-title">{{ post.title }}</h2>
                <div class="post-content" v-html="characterLimit(post.content)"></div>
            </router-link>
        </article>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Posts',
    data(){
        return{
            posts: [],
            visible: false
        }
    },
    mounted(){
        if(localStorage.user != undefined){
            this.getAllPost();
        }
        //export de la fonction :
        this.$root.$on('Posts', () => {
            this.getAllPost();
        });
    },
    
    methods: {
        getAllPost(){
            axios.get(`${this.$apiUrl}/posts/`,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
            .then(res => { this.posts = res.data; });
        },
        characterLimit(content){
            let text = content;
            const maxLength = 350;
            if(text.length > maxLength){
                return text.substring(0, maxLength - 3)+"...";
            }else{
                return text;
            }
        },
        dateFormat(date){
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
            return event.toLocaleDateString('fr-FR', options);
        }
    }
};
</script>

<style scoped>
    .posts {
        margin: 0 auto;
        padding: 20px;
        max-width: 800px;
    }
    h1 {
        text-decoration: underline;
    }
    .post {
        position: relative;
        padding: 20px 20px 20px 30px;
        margin-bottom: 25px;
        border: 1px solid black;
        border-radius: 5px;
        background-color: #D3D3D3;
        transition-duration: 0.2s;
    }
    .post:hover {
        box-shadow: 2px 2px 5px black;
        border: 1px solid red;
    }
    .post-header {
        display: flex;
        justify-content: space-between;
    }
    .post-modify {
        font-weight: bold;
    }
    .post-title {
        color: #002766/*green;*/
    }
    .post-content {
        font-size: .9rem;
    }
</style>