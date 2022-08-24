<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Cadastrar aluno</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="4">
                <v-text-field
                  v-mask.raw="'###.###.###-##'"
                  label="CPF*"
                  v-model="student.cpf"
                  required>
                </v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="8"
                md="8">
                <v-text-field
                  label="Nome*"
                  v-model="student.name"
                  required>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="student.email"
                  required>
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="CEP*"
                  v-mask.raw="'##.###-###'"
                  v-model="student.cep"
                  @blur="getCep"
                  required>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  label="Rua*"
                  v-model="student.street"
                  required>
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  ref="number"
                  label="Número*"
                  v-model="student.number"
                  required>
                </v-text-field>
              </v-col><v-col cols="8">
                <v-text-field
                  label="Cidade*"
                  v-model="student.city"
                  required>
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="UF*"
                  v-model="student.state"
                  required>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indica um campo obrigatório</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close"
          >
            Fechar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    name: 'add-student',
    data() {
      return {
        dialog: true,
        student: {
          "ra": null,
          "email": null,
          "name": null,
          "cpf": null,
          "cep": null,
          "street": null,
          "number": null,
          "state": null,
          "city": null,
          "createdAt": null,
          "updatedAt": null,
          "deletedAt": null
        },
        baseUrl: 'https://viacep.com.br/ws/'
      };
    },
    methods: {
      close() {
        this.$emit('dialogOnClose', true);
      },
      save() {
        const config = {
          headers: { Authorization: `Bearer ${ JSON.parse(localStorage.userData).token }` }
        };

        const req = {
            "name": this.student.name,
            "email": this.student.email,
            "cpf": this.student.cpf.replace(/[^0-9]+/g, ""),
            "cep": this.student.cep.replace(/[^0-9]+/g, ""),
            "street": this.student.street,
            "number": this.student.number,
            "state": this.student.state,
            "city": this.student.city
        };

        this.$axios.post(this.$store.state.apiURL + '/api/student', req, config)
          .then((result) => {
            if (result.data) {
              this.students = result.data;
              this.$emit('dialogOnSave', true);
            }
          }).catch(e => {
            this.$store.state.mainLayout.openSnackbar(e.response.data.error)
      })
      },
      getCep () {
          const url = `${this.baseUrl}${this.student.cep.replace(/[^0-9]+/g, "")}/json/`
          this.$axios.get(url).then(resp => {
            const data = resp.data;
            if (!data.erro) {
              this.student.street = data.logradouro;
              this.student.state = data.uf;
              this.student.city = data.localidade;

              this.$refs.number.focus();
            } else {
              this.$store.state.mainLayout.openSnackbar('CEP não encontrado.');
            }
          }).catch(error => {
            console.error(error)
          })
      }
    }
  }
</script>