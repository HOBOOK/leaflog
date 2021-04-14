import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#827717',
            second: '#e0e0e0',
            background: '#fcfcfc'
          },
          dark: {
            primary: '#827717',
            second: '#e0e0e0',
            background: '#333'
          }
        },
      },
});
