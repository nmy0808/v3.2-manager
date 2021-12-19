import layout from '@/views/layout'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/create',
  name: 'articleCreate',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
    {
      path: '/article/create',
      component: () => import('@/views/article-create/index'),
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      component: () =>
        import(
          /* webpackChunkName: "article-create" */ '@/views/article-create/index'),
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
