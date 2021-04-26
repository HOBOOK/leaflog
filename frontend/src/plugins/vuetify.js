import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#66BB6A',
            second: '#e0e0e0',
            background: '#fff'
          },
          dark: {
            primary: '#66BB6A',
            second: '#e0e0e0',
            background: '#333'
          }
        },
      },
});
