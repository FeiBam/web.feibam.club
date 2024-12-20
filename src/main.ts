import './assets/main.css'
import './assets/media.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n/index'

import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import {
  faRss,
  faLink,
  faInfoCircle,
  faTag,
  faCalendarAlt,
  faGlobeAfrica,
} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons'

import { faW } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(
  faUserSecret,
  faW,
  faRss,
  faLink,
  faInfoCircle,
  faGithub,
  faTelegram,
  faTwitter,
  faTag,
  faCalendarAlt,
  faGlobeAfrica,
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
