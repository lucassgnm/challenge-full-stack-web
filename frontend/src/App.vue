<template>
  <v-app ref="mainLayout">
    <v-app-bar
      app
      color="#bbb"
      dark
    >
      <div class="d-flex align-center">
        <img width="60px" :src="logoSVG" />
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <v-snackbar
      v-model="snackbar"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="closeSnackbar"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    logoSVG: require('./assets/logo-mais-a-educacao.svg'),
    snackbar: false,
    snackbarText: ''
  }),
  methods: {
    closeSnackbar() {
      this.snackbar = false;
    },
    openSnackbar(text) {
      this.snackbar = true;
      this.snackbarText = text;
    }
  },
  mounted() {
    this.$store.state.mainLayout = this;
  }
};
</script>
