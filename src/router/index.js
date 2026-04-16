import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import movieformPAGE from '../views/movieformPAGE.vue'

const routes= [{
  path:'/',
  component: App
},
{
  path:'/movies/new',
  component: movieformPAGE
},
{path: '/movies/:id/edit',
component:movieformPAGE
}
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes})

export default router
