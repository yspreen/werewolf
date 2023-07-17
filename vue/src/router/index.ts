import { createRouter, createWebHistory } from 'vue-router'
import EntryPoint from '../components/EntryPoint.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: EntryPoint
    },
    {
      path: '/rooms',
      name: 'rooms',
      // route level code-splitting
      // this generates a separate chunk (<page>.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/RoomList.vue')
    },
    {
      path: '/room/:roomId',
      name: 'room',
      // route level code-splitting
      // this generates a separate chunk (<page>.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/RoomLobby.vue')
    },
    {
      path: '/playing/:roomId',
      name: 'playing',
      // route level code-splitting
      // this generates a separate chunk (<page>.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/RoomInPlay.vue')
    },
    {
      path: '/set-name',
      name: 'set-name',
      // route level code-splitting
      // this generates a separate chunk (<page>.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/SetName.vue')
    }
  ]
})

export default router
