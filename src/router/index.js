import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView'
import MessagesView from '../views/MessagesView'
import ChatView from '../views/ChatView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/messages',
    name: 'messages',
    component: MessagesView
  },
  {
    path: '/messages/chat/:id',
    name: 'single',
    component: ChatView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
