<template>
  <v-app>
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
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    logoSVG: require('./assets/logo-mais-a-educacao.svg')
  }),
};
</script>
