

<template>
    <div class="comments">
        <form @submit.prevent= newComment()>
            <label for="new-comment">Laisser un commentaire :</label><br>
            <textarea name="newComment" id="new-comment" placeholder="laisser un commentaire..." cols="50" rows="5" required></textarea><br>
            <button type="submit" id="send-comment">Envoyer</button>
        </form>
        <h2 v-if="comments.length > 0">Commentaires :</h2>

        <div class="comments">
            <div class="comment" v-for="comment in comments" :key="comment.id">
                <div class="comment-info">Par {{ comment.prenom }} {{ comment.nom }} le {{ dateFormat(comment.dateCreate) }}
                    <span class="delete" @click="deleteComment(comment.id)" v-if="comment.userId === $user.userId || $user.admin === 1" :key="comment.id">Supprimer</span>
                </div>
                {{ comment.content}}
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Comments',
    data(){
        return{
            comments: []
        }
    },
    mounted(){
        this.getAllComments();
    },
    methods:{
        newComment(){
            const postId = parseInt(this.$route.params.id);
            const userId = this.$user.userId;
            const content = document.getElementById("new-comment").value;

            axios.post(`${this.$apiUrl}/posts/${postId}/comment/`,
                {//envoie des données rentrée 
                    userId, 
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
                .then(this.getAllComments());
        },

        getAllComments(){
            const postId = parseInt(this.$route.params.id);

            axios.get(`${this.$apiUrl}/posts/${postId}/comments`,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                 }
             })
            .then(res => {
                this.comments = res.data;
            });
        },

        deleteComment(commentId){
            axios.delete(`${this.$apiUrl}/posts/comment/${commentId}`,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$token}`
                }
            })
            .then(this.getAllComments());
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
    .comments {
        max-width: 800px;
        margin: 0 auto;
        padding: 30px;
    }
    textarea {
        border-radius: 5px;
        border: 1px solid black;
        box-shadow: 2px 2px 5px black;
    }
    .comment {
        padding: 20px 20px 20px 30px;
        margin-bottom: 10px;
        text-align: left;
        border-radius: 5px;
        border: 1px solid black;
        box-shadow: 2px 2px 5px black;
        transition-duration: .1s;
    }
    .comment-info {
        display: flex;
        justify-content: space-between;
        font-size: .8rem;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .comment-info span {
        font-weight: bold;
        cursor: pointer;
    }
    #new-comment {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        width: 100%;
    }
    button {
        color: white;
        font-weight: bold;
        background-color: #002766;/*black;*/
        padding: 5px;
        border: 1px solid black;
        border-radius: 5px;
        transition-duration: .2s;
    }
    button:hover {
        cursor: pointer;
        color: #002766;/*black;*/
        background-color: red;
        font-size: 1rem;
    }
    .delete:hover {
        color: red;
        cursor: pointer;
        font-size: 0.9rem;
    }
</style>