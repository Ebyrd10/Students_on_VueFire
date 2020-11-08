import Vue from 'vue'
import App from './App.vue'

//Import and use the Vuefire plugin for easy firebase db mangement
import {firestorePlugin} from 'vuefire'

//Using vuetify material theme
import vuetify from './plugins/vuetify';

Vue.use(firestorePlugin)

Vue.config.productionTip = false


//Creates the vue app instance
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

