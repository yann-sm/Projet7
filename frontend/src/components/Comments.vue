

<template>
    <div class="comments">
        <form @submit.prevent= newComment()>
            <label for="new-comment">Laisser un commentaire :</label>
            <textarea name="newComment" id="new-comment" placeholder="laisser un commentaire..." cols="30" rows="10" required></textarea>
            <button type="submit" id="send-comment">Envoyer</button>
        </form>
        <h2 v-if="comments.length > 0">Commentaires :</h2>

        <div class="comments">
            <div class="comment" v-for="comment in comments" :key="comment.id">
                <div class="comment-info">Par {{ comment.prenom }} {{ comment.nom }} le {{ dateFormat(comment.date) }}
                    <span @click="deleteComment(comment.id)" v-if="comment.userId === $user.userId" :key="comment.id">Supprimer</span>
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
            const content = document.getElementById("new-content").value;

            axios.post(`${this.$apiUrl}/posts/${postId}/comments/`,
                {
                    userId, 
                    content
                },
                {
                    headers:{
                        'Content-type': 'application/json',
                        'Autorization': `Bearer ${this.$token}`
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
                    'Authorization': `Beaer ${this.$token}`
                 }
             })
            .then(res => {
                this.comments = res.data;
            });
        },

        deleteComment(commentId){
            axios.delete(`${this.$apiUrl}/posts/comments/${commentId}`,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Beaer ${this.$token}`
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
    .comment {
        padding: 20px 20px 20px 30px;
        text-align: left;
        border: 1px solid black;
        transition-duration: .1s;
    }
    .comment-info {
        display: flex;
        justify-content: space-between;
        font-size: .8rem;
        margin-bottom: 10px;
    }
    .comment-info span {
        font-weight: bold;
        cursor: pointer;
    }
</style>