<template>
   <v-app :class="{ 'pa-3 mt-16': $vuetify.breakpoint.smAndUp }" id="inspire">
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <v-flex>
                  <img width="60px" :src="logoSVG" />
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>Entre com seu usuário e senha:</p>
              <v-form>
                <v-text-field
                  outline
                  label="Usuário"
                  type="text"
                  v-model="username">
                </v-text-field>
                <v-text-field
                  outline
                  hide-details
                  label="Senha"
                  type="password"
                  v-model="password">
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-spacer></v-spacer>
              <v-btn 
                color="info" 
                @click="login"
                :large="$vuetify.breakpoint.smAndUp">
                <v-icon left>lock</v-icon>
                Entrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm12 md6 offset-md3>
          <v-layout align-center justify-space-between>
            <p class="caption my-3">
              <a href="#">Política de privacidade</a>
              |
              <a href="#">Termos de serviço</a>
            </p>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
   </v-app>
</template>

<script>
export default {
   name: 'login-view',
   props: {
      source: String,
   },
   data: () => ({
    logoSVG: require('../assets/logo-mais-a-educacao.svg'),
    username: null,
    password: null
  }),
  methods: {
    login() {
      const baseURI = 'https://jsonplaceholder.typicode.com/users'
      this.$axios.get(baseURI)
      .then((result) => {
        this.users = result.data
      })
    }
  }
};
</script>

<style></style>
