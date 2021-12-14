import { createApp } from 'vue'
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

const app = createApp(App)
installElementPlus(app)
installSvgIcon(app)
app.use(store).use(router).mount('#app')
