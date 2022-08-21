<template>
  <v-app ref="mainLayout">
    <v-navigation-drawer
    :class="{ 'pa-3 mt-16': $vuetify.breakpoint.smAndUp }"
      v-if="this.$route.name !== 'login'"
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Admin</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
    snackbarText: '',
    items: [
      { title: 'Home', icon: 'mdi-home-city', route: 'home' },
      { title: 'Alunos', icon: 'mdi-account', route: 'about' },
      { title: 'Sair', icon: 'mdi-exit-to-app', route: 'login' },
    ],
    drawer: true,
    mini: true
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

<style>
  .v-navigation-drawer {
    min-width: 80px !important;
  }
</style>