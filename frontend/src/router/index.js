import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Signup from '../views/Signup.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [    
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup//() => import('../views/Signup.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile//() => import('../views/Profile.vue')
    }
    /**/
]

const router = new VueRouter({
  routes
})

export default router;
