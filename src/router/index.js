import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/views/layout'
import userManage from '@/router/user-manage'
import roleList from '@/router/role-list'
import permissionList from '@/router/permission-list'
import articleCreate from '@/router/article-create'
import articleRating from '@/router/article-rating'
import store from '@/store'
import storage from '@/utils/storage'
import constants from '@/constants'
import { contrast } from 'css-color-function/lib/adjusters'

// export const privateRoutes = [
//   {
//     path: '/user',
//     component: layout,
//     redirect: '/user/manage',
//     name: 'userManage',
//     meta: {
//       title: 'user',
//       icon: 'personnel'
//     },
//     children: [
//       {
//         path: '/user/manage',
//         component: () => import('@/views/user-manage/index'),
//         meta: {
//           title: 'userManage',
//           icon: 'personnel-manage'
//         }
//       },
//       {
//         path: '/user/role',
//         component: () => import('@/views/role-list/index'),
//         name: 'roleList',
//         meta: {
//           title: 'roleList',
//           icon: 'role'
//         }
//       },
//       {
//         path: '/user/permission',
//         component: () => import('@/views/permission-list/index'),
//         name: 'permissionList',
//         meta: {
//           title: 'permissionList',
//           icon: 'permission'
//         }
//       },
//       {
//         path: '/user/info/:id',
//         props: true,
//         name: 'userInfo',
//         component: () => import('@/views/user-info/index'),
//         meta: {
//           title: 'userInfo'
//         }
//       },
//       {
//         path: '/user/import',
//         name: 'import',
//         component: () => import('@/views/import/index'),
//         meta: {
//           title: 'excelImport'
//         }
//       }
//     ]
//   },
//   {
//     path: '/article',
//     component: layout,
//     redirect: '/article/ranking',
//     name: 'articleRanking',
//     meta: {
//       title: 'article',
//       icon: 'article'
//     },
//     children: [
//       {
//         path: '/article/ranking',
//         component: () => import('@/views/article-ranking/index'),
//         meta: {
//           title: 'articleRanking',
//           icon: 'article-ranking'
//         }
//       },
//       {
//         path: '/article/:id',
//         component: () => import('@/views/article-detail/index'),
//         meta: {
//           title: 'articleDetail'
//         }
//       },
//       {
//         path: '/article/create',
//         component: () => import('@/views/article-create/index'),
//         name: 'articleCreate',
//         meta: {
//           title: 'articleCreate',
//           icon: 'article-create'
//         }
//       },
//       {
//         path: '/article/editor/:id',
//         component: () => import('@/views/article-create/index'),
//         meta: {
//           title: 'articleEditor'
//         }
//       }
//     ]
//   }
// ]
/**
 * 私有路由表
 */
export const privateRoutes = [
  userManage,
  roleList,
  permissionList,
  articleRating,
  articleCreate
]
export const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'self'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router

/**
 * 重置路由列表 恢复到只有publicRoutes
 */
export const resetRoutes = () => {
  const userInfo = store.getters.userInfo
  // 根据userInfo里的menus菜单信息遍历删除私有路由, 最终只保留公开路由列表
  if (store.getters.isHasUserInfo) {
    userInfo.permission.menus.forEach(name => {
      router.removeRoute(name)
    })
  }
}
