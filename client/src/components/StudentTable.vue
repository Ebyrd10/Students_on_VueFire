<template>
  <div class=
  "student-table
  d-flex
  pa-6
  flex-column">
    <v-data-table
    :headers="headers"
    :items="students"
    :items-per-page="5"
    class="elevation-8"
    hide-default-footer
    :search="search"
    >
    <!-- Search Bar Template -->
    <template v-slot:top>
      <v-text-field
      v-model="search"
      label="Search"
      class="mx-4"
      ></v-text-field>
      <div class="amber darken-1 mx-auto amber--text text--darken-1 ml-1 mr-1">Students</div>
    </template>
    </v-data-table>
    <!-- Edit Dialog Box -->
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on, attrs}"> 
        <v-btn
        color="red"
        dark
        class="mb-2"
        v-bind="attrs"
        v-on="on">
          New Item
        </v-btn>
      </template>

  <!-- What is shown when the dialogue box is opened -->
    <v-card>
      <v-card-title>
        Edit Item
      </v-card-title>
      <v-card-text>
        <v-container>
          <!-- A row to display first and last name -->
          <v-row>
            <v-col>
              <v-text-field 
              v-model="editedItem.firstName"
              label="First"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="editedItem.lastName"
              label="Last"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- A 2nd row for age -->
          <v-row>
            <v-col>
              <v-text-field  v-model="editedItem.age"
              label="Age"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    </v-dialog>
  </div>
</template>

<script>
import { db } from "../db.js";

export default {
  data() {
    return {
      search:'',
      students: [],
      headers: [
        {text: 'First', value: 'firstName'},
        {text: 'Last', value: 'lastName'},
        {text: 'Age', value: 'age'},
        {text: 'Modify', value: 'modify', sortable: false},
      ],
      blankItem: {
        firstName: "",
        lastName: "",
        age: ""
    },
    editedItem: {
        firstName: "",
        lastName: "",
        age: ""
    },
    dialog: false,
    };
  },

  watch: {
    dialog (val){
      val || this.closeDialogue()
    },
  },

  methods: {
    closeDialogue(){
      this.dialog = false;
      this.$nextTick(()=>{
        //Sets the edited item in state equal to a blank template item
        this.editedItem = Object.assign({}, this.blankItem)
      })
    },
    openDialogue(item){
      //Sets the edited item in state equal to the current item being selected by the user
      this.editedItem = Object.assign({}, item)
      this.dialog = true;
    }
  },

  firestore: {
    students: db.collection("students"),
  },

  name: "StudentTable",
};
</script>

<style>
</style>
