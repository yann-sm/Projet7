
<template>
  <div class="home">
    <LoginForm v-if="!connected"/>
    <Header v-if="connected"/>
    <NewPost v-if="connected"/>
    <Posts v-if="connected"/><!-- v-if="connected" ou v-if="!connected" -->
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import Header from '@/components/Header.vue';
import Posts from '@/components/Posts.vue';
import NewPost from '@/components/NewPost.vue';


export default {
  name: 'Home',
  components:{
    LoginForm, 
    Header,
    Posts,
    NewPost,
  },
  data(){
        return{
            connected: true
        };
    },

    created(){
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
