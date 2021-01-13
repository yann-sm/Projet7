import Vue from 'vue'
import VueRouter from 'vue-router'
//omport des différnetes vue :
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Signup from '../views/Signup.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [    
    {
      path: '/', //url attribué au chemin du composant
      name: 'Home', //le nom de cette route pour l'étiquetage et le débugage 
      component: Home //le composant qui doit s'afficher lorsque le path est trouvé
    },
    {
      path: '/Post/:id',
      name: 'Post',
      component: Post//() => import('../views/Post.vue')
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup//() => import('../views/Signup.vue')
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile//() => import('../views/Profile.vue')
    }
    /**/
]

const router = new VueRouter({
  routes
});

export default router;
