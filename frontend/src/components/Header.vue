
<!--On définit le html entre les balise template-->
<template>
    <div>
        <div class="header">
            <router-link to="/"><!-- router-link : ce composant permet la navigation de l'utilisateur dans l'application comme la balise anchor-->
                <div>
                    <img src="../assets/logo.png" alt="logo groupomania">
                </div>
            </router-link>
            <!--Nvaigation principal-->
            <nav>
                <router-link to="/Profile">
                    <div>Mon compte</div>
                </router-link>
                <div id="disconnect-btn" @click = disconnect()>Se déconnecter</div>
            </nav>
        </div>
    <div class="hr"></div>
</div>
</template>

<!--On définit le javascript entre les balises script-->
<script>
export default {
    name: 'Header',
    methods:{
        //method pour se deconnecté en supprimant l'utilisateur du localstorage et en rechargent la page
        disconnect(){
            localStorage.removeItem('user');
            location.href = "/";
        }
    }
}
</script>

<!--On définit le css entre les balise style, scoped limite la porté du css uniquement à cette page-->
<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 70px 30px 70px;
    }
    .header img {
        width: 250px;
        height: auto;
        margin-bottom: 10px;
    }
    nav {
        display: flex;
    }
    nav div {
        margin-left: 30px;
        font-weight: bold;
        cursor: pointer;
        transition-duration: .2s;
    }
    nav div:hover {
        color: green;
    }
    .hr {
        width: 100%;
        border: 1px solid red;
    }

    @media (max-width: 670px){
        .header {
            flex-direction: column;
            padding: 30px 20px 20px 20px;
        }
    }
</style>