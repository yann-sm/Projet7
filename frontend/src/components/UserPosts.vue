

<template>
    <div class="userPost">
        <div v-for="post in posts" :key="post.id">
            <router-link :to="{ name: 'Post', params: { id: post.id}}">
                <div class="post">
                    {{post.title}}
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
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
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
            .then(res => this.posts = res.data)
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
    }
    .post:hover {
        box-shadow: 0px 0px 50px -7px red;
    }
</style>