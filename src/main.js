import Vue from 'vue'

import VueRouter from 'vue-router'
import routes from '@/routes'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faTimes,
  faEyeSlash,
  faEye,
  faDice,
  faCopy,
  faPlusCircle,
  faFileImport,
  faUnlockAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import KbInput from '@/components/common/KbInput.vue'
import KbTextarea from '@/components/common/KbTextarea.vue'
import KbButton from '@/components/common/KbButton.vue'
import KbCopyIcon from '@/components/common/KbCopyIcon.vue'

import App from '@/App.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

library.add(
  faEdit,
  faTrashAlt,
  faCheck,
  faTimes,
  faEyeSlash,
  faEye,
  faDice,
  faCopy,
  faPlusCircle,
  faFileImport,
  faUnlockAlt
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('kb-input', KbInput)
Vue.component('kb-textarea', KbTextarea)
Vue.component('kb-button', KbButton)
Vue.component('kb-copy-icon', KbCopyIcon)

new Vue({
  router: new VueRouter(routes),
  render: h => h(App)
}).$mount('#app')
