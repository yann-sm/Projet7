
<template>
    <div class="newPost">
        <div class="newPost-create-btn" @click="visible=true">Ajouter une nouvelle publication</div>

        <transition name="fade">
            <div class="overlay" v-if="visible">
                <div class="form-wrapper">
                    <span class="form-close" @click="visible=false">Fermer</span>
                    <form class="newPost-form" @submit.prevent="sendNewPost()">
                        <label for="newPost-title">Titre de la publication :</label>
                        <input id="newPost-title" type="text" placeholder="titre de la publication">

                        <label for="newPost-content">Contenu de la publication :</label>
                        <textarea id="newPost-content" cols="30" rows="10" placeholder="contenu de votre pubication..."></textarea>

                        <button id="newPost-btn" type="submit">Publier</button>
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
            {//envoie des données rentrée 
                userId: this.$user.userId,
                title,
                content
            },
            {/*objet de configuration headers, contenant une en-tête pour le type de données 
            et une en-tête d'authentification par un token, afin de protéger les données et de données 
            accès au porteur de ce token*/
                headers:{
                    'Content-Type': 'application/json',//type de données
                    'Authorization': `Bearer ${this.$token}`//authentification par un token
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
        padding: 5px;
        border-radius: 10px;
        background-color: #002766;/*black;*/
        color: white;
        max-width: 750px;
        font-size: 1.5rem;
        transition-duration: 0.2s;
        cursor: pointer;
    }
    .newPost-create-btn:hover {
        background-color: red;
        color: #002766;;
        box-shadow: 2px 2px 5px black;
        border: 1px solid black;
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
        background-color: #002766;/*white */
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
        transition-duration: 0.3s;
        color: white;
    }
    .form-close:hover {
        color: red;
        font-size: 1.1rem;
    }
    label {
        color: white;
    }
    .newPost-form {
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    #newPost-title {
        border-radius: 5px;
        border: 1px solid black;
        font-size: 1rem;
        padding: 5px;
    }
    #newPost-content {
        height: 200px;
        width: calc(100% - 20px);
        padding: 10px;
        resize: none;
        overflow-y: scroll;
        border-radius: 5px;
        border: 1px solid black;
        font-size: 0.9rem;
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }
    #newPost-btn {
        padding: 5px;
        border-radius: 5px;
        border: 1px solid;
        cursor: pointer;
        font-weight: bold;
        font-size: 1.1rem;
        background-color: black;
        color: white;
        transition-duration: 0.2s;
    }
    #newPost-btn:hover {
        background-color: red;
        color: black;
    }

    /* Transition */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .8s;
    }
    .fade-enter, .fade-leave {
        opacity: 0;
    }
</style>