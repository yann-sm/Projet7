

<template>
    <div class="post">
        <LoginForm v-if="!connected"/>
        <Header v-if="connected"/>
        <OnePost v-if="connected"/>
        <Comments v-if="connected"/>
    </div>
</template>

<script>
//import des différents composents pour les posts :
//@ est un alias pour src -
import LoginForm from '@/components/LoginForm.vue';
import Header from '@/components/Header.vue';
import OnePost from '@/components/OnePost.vue';
import Comments from '@/components/Comments.vue';

export default {
    name: 'Post',
    components:{
        Header,
        LoginForm,
        OnePost,
        Comments
    },
    data(){
        return{
            connected: true,
            authorized: true
        };
    },
    created(){
        this.checkConnected();
    },
    methods:{
        checkConnected(){
            if(localStorage.user !== undefined){
                this.connected = true;
                console.log('utilisateur connecté.');
            }
            else if(localStorage.user === undefined){
                this.connected = false;
                console.log('utilisateur non connecté.');
            }
        }
    }
}
</script>