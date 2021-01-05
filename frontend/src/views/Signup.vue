

<template>
    <div class="signup">
        <SignupForm />
    </div>
</template>

<script>
//import du composents signupForm pour l'insription ou la connexion :
//@ est un alias pour src -
import SignupForm from '@/components/SignupForm.vue';

export default {
    name: 'Signup',
    components:{
        SignupForm
    },    
}
</script>