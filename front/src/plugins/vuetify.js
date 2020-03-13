import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  theme: {
    themes: {
      light: {
        primary: '#25ae88', // green
        secondary: '#566166', // dimgray
        accent: '#e7f0f0', // lavender
        error: '#EA5455',
        info: '#25ae88',
        success: '#4CAF50', // default vuetify green
        warning: '#EA5455'
      }
    }
  }
})
