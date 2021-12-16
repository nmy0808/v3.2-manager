import { createApp } from 'vue'
import i18n from '@/i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// svg-icon 图标组件
import installSvgIcon from './icons'
// 全局css
import '@/assets/styles/index.scss'
// 鉴权
import './permission'
// 注册全局filter
import { installGlobalFilters } from '@/filters'

const app = createApp(App)
installGlobalFilters(app)
app.use(i18n)
installElementPlus(app)
installSvgIcon(app)
app.use(store).use(router).mount('#app')
