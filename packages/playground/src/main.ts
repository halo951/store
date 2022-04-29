import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from './store'

window.onload = () => {
    console.log('onload')
}
createApp(App).use(router).use(store).mount('#app')
