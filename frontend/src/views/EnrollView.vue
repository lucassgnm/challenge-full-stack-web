<template>
  <v-app>
    <v-card class="mr-5">
      <v-card-title>
        <v-btn class="mx-2" dark small color="#BBBBBB" @click="rowAdd()">
          <v-icon dark>mdi-plus</v-icon>
          Adicionar novo aluno
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="students"
        :search="search">
        <template v-slot:item="row">
          <tr>
            <td>{{row.item.ra}}</td>
            <td>{{row.item.name}}</td>
            <td>{{row.item.cpf}}</td>
            <td>
              <v-btn class="mx-2" dark small color="#BBBBBB" @click="rowDelete(row.item)">
                  <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn class="mx-2" dark small color="#BBBBBB" @click="rowEdit(row.item)">
                  <v-icon dark>mdi-account-edit</v-icon>
              </v-btn>
            </td>
          </tr>
      </template>
      </v-data-table>
    </v-card>
    <add-student v-if="dialogAddStudent" @dialogOnClose="dialogOnClose" @dialogOnSave="dialogOnSave"></add-student>
  </v-app>
</template>

<script>
import AddStudent from '../components/AddStudent.vue'

export default {
  name: 'login-view',
  components: {
    AddStudent,
  },
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'RA',
          align: 'start',
          value: 'ra',
          width: "20%"
        },
        { 
          text: 'Nome', 
          value: 'name',
          width: "40%"
        },
        {
          text: 'CPF', 
          value: 'cpf',
          width: "20%" 
        },
        {
          text: 'Editar', 
          width: "10%",
          sortable: false
        },
        {
          text: 'Excluir', 
          width: "10%",
          sortable: false
        }
      ],
      students: [],
      dialogAddStudent: false
    }
  },
  methods: {
    getStudents() { 
      const config = {
        headers: { Authorization: `Bearer ${ JSON.parse(localStorage.userData).token }` }
      };
      this.$axios.get(`${this.$store.state.apiURL}/api/student/`, config)
        .then((result) => {
          if (result.data) {
            this.students = result.data;
          }
        }).catch(e => {
          this.$store.state.mainLayout.openSnackbar(e.response.data.error);
      })
    },
    rowAdd() {
      this.dialogAddStudent = true;
    },
    dialogOnClose() {
      this.dialogAddStudent = false;
    },
    dialogOnSave() {
      this.dialogAddStudent = false;
      this.$store.state.mainLayout.openSnackbar('Aluno adicionado com sucesso.');
      this.getStudents();
    },
    rowEdit(args) {
      console.log(args)
    },
    rowDelete(args) {
      const config = {
        headers: { Authorization: `Bearer ${ JSON.parse(localStorage.userData).token }` }
      };
      this.$axios.delete(`${this.$store.state.apiURL}/api/student/${args.ra}`, config)
        .then((result) => {
          if (result.data) {
            this.$store.state.mainLayout.openSnackbar('Aluno excluído com sucesso.');
            this.getStudents();
          }
        }).catch(e => {
          this.$store.state.mainLayout.openSnackbar(e.response.data.error);
        });
    },
  },
  created() {
    this.getStudents();
  }
};

</script>