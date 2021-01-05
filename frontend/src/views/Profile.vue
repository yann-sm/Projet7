

<template>
    <div class="profile">
        <LoginForm v-if="!connected"/>
        <Header v-if="connected"/>
        <UserProfile v-if="connected"/>
        <UserPosts v-if="connected"/>
    </div>
</template>

<script>
//import des différents composents pour la page profile :
//@ est un alias pour src -
import LoginForm from '@/components/LoginForm.vue';
import Header from '@/components/Header.vue';
import UserProfile from '@/components/UserProfile.vue';
import UserPosts from '@/components/UserPosts.vue';

export default {
    name: 'Profile',
    components:{
        LoginForm,
        Header,
        UserProfile,
        UserPosts
    },
    data(){
        return{
            connected: true
        };
    },

    created(){ //fonction de cycle de vie, pour dire quand affiché un contenu
        this.checkConnected()
    },

    methods:{
        checkConnected(){
            if(localStorage.user !== undefined){
                this.connected = true;
                console.log("utilisateur connecté.");
            }
            else if(localStorage.user === undefined){
                this.connected = false;
                console.log("utilisateur non connecté.");
            }
        }
    }
}
</script>