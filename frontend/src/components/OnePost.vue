
<template>
    <div class="onePost">
        <div class="post-wrapper" v-if="!modify">
            <h2 class="post-title">{{ this.post.title }}</h2>
            <div class="post-content" v-html="this.post.content"></div>
        </div>

        <div class="modify-wrapper" v-if="modify">
            <label for="modify-title">Modifier le titre :</label>
            <input id="modify-title" type="text" v-model="this.post.title">

            <label for="modify-content">Modifier le contenu :</label>
            <textarea id="modify-content" cols="30" rows="10" v-model="this.post.content"></textarea>
        </div>
        <button v-if="authorized && !modify" @click="modify=true">Modifier</button>
        <button v-if="modify" @click="modify=false">Annuler</button>
        <button v-if="modify" @click="modifyOnePost()">Publier la modification</button>
        <button v-if="modify" @click="deleteOnePost()">Supprimer le post</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'OnePost',
    data(){
        return{
            modifiedContent: '',
            post: [],
            authorized: false,
            modify: false
        }
    },
    mounted(){
        this.getOnePost();
    },
    methods:{
        getOnePost(){
            const postId = this.$route.params.id;
            axios.get(`${this.$apiUrl}/posts/${postId}`,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Beaer ${this.$token}`
                }
            })
            .then(res => {
                this.post = res.data[0];

                if(this.$user.userId === this.post.userId){
                    this.authorized = true;
                }
                else{
                    this.authorized = false;
                }
            })
        },

        deletOnePost(){
            const postId = this.$route.params.id;
            axios.delete(`${this.$apiUrl}/posts/${postId}`,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Beaer ${this.$token}`
                }
            })
            .then(location.href = "/");
        },

        modifyOnePost(){
            const postId = this.$route.params.id;
            const title = document.getElementById("modify-title").value;
            const content = document.getElementById("modify-content").value;

            axios.put(`${this.$apiUrl}/posts/${postId}`,
            {
                postId, 
                title,
                content
            },
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Beaer ${this.$token}`
                }
            })
            .then(location.href = "/");
        }
    }
}
</script>

<style scoped>
    .post-wrapper {
        margin: 50px auto 30px auto;
        padding: 30px;
        max-width: 800px;
        text-align: left;
    }
    .post-title {
        margin: 0;
        font-size: 2rem;
    }
    .post-content {
        margin-top: 20px;
    }

    .modify-wrapper {
        display: flex;
        flex-direction: column;
        margin: 5px auto;
        padding: 30px;
        max-width: 800px;
        text-align: left;
    }
    #modify-title {
        margin: 0;
        margin-bottom: 20px;
        font-size: 2rem;
    }
    #modify-content {
        margin-top: 20px;
        height: 200px;
        width: calc(100% - 22px);
        padding: 10px;
        resize: none;
        overflow-y: scroll;
    }
    .onePost button {
        margin-top: 20px;
        padding: 10px;
        font-size: 1.1rem;
        color: white;
        background-color: black;
        border-radius: 5px;
        cursor: pointer;
    }

</style>