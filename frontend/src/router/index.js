import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'

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
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Profile.vue')
    },
]

const router = new VueRouter({
  routes
})

export default router;
