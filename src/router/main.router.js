import index from '../views/index.vue'

const mainRouter = [
  {
    path: '/',
    name: 'index',
    component:index,
    redirect: { name: 'home' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/index.vue')
      },
    ]
  }
]

export default mainRouter
