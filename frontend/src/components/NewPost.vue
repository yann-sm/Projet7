
<template>
    <div class="newPost">
        <div class="newPost-create-btn" @click="visible=true">Ajouter un nouveau post</div>

        <transition name="fade">
            <div class="overlay" v-if="visible">
                <div class="form-wrapper">
                    <span class="form-close" @click="visible=false">Fermer</span>
                    <form class="newPost-form" @submit.prevent="sendNewPost()">
                        <label for="newPost-title">Titre du post :</label>
                        <input id="newPost-title" type="text" placeholder="titre de votre poste">

                        <label for="newPost-content">Contenu du post :</label>
                        <textarea id="newPost-content" cols="30" rows="10" placeholder="contenu de votre poste..."></textarea>

                        <button id="newPost-btn" type="submit">Publier le post</button>
                    </form>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'NewPost',
    data(){
        return{
            visible: false, 
            content: '',
        }
    },
    methods:{
        sendNewPost(){
            const title = document.getElementById("newPost-title").value;
            const content = document.getElementById("newPost-content").value;

            axios.post(`${this.$apiUrl}/posts/`,
            {
                userId: this.$user.userId,
                title,
                content
            },
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Beaer ${this.$token}`
                }
            })
            .then(this.visible = false)
            .then(this.$root.$emit('Posts'));
        }
    }
}
</script>

<style scoped>
    .newPost {
        padding: 20px 20px 0px 20px;
        font-weight: bold;
    }
    .newPost-create-btn {
        margin: 30px auto;
        padding: 20px;
        border-radius: 30px;
        background-color: black;
        color: coral;
        max-width: 750px;
        font-size: 1.5rem;
        transition-duration: 0.2s;
        cursor: pointer;
    }
    .newPost-create-btn:hover {
        background-color: red;
        color: black;
    }
    .overlay {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(31, 30, 30, 0.678);
        z-index: 1;
    }
    .form-wrapper {
        box-sizing: border-box;
        background-color: white;
        display: flex;
        flex-direction: column;
        padding: 5%;
        width: 800px;
        height: 80%;
        border-radius: 15px;
    }
    .form-close {
        cursor: pointer;
        align-self: flex-end;
    }
    .newPost-form {
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    #newPost-title {
        border-radius: 5px;
        border: 1px solid black;
    }
    #newPost-content {
        height: 200px;
        width: calc(100% - 20px);
        padding: 10px;
        resize: none;
        overflow-y: scroll;
        border-radius: 5px;
        border: 1px solid black;
    }
    #newPost-btn {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid;
        cursor: pointer;
        font-weight: bold;
        font-size: 1.1rem;
        background-color: red;
        transition-duration: 0.2s;
    }

    /* Transition */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .8s;
    }
    .fade-enter, .fade-leave {
        opacity: 0;
    }
</style>