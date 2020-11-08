<template>
  <div class=
  "student-table
  d-flex
  pa-6
  flex-column">
    <v-data-table
    :headers="headers"
    :items="students"
    class="elevation-8"
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
    

    <!-- Edit Dialog Box -->
    <v-dialog 
    v-model="dialog"
    max-width="250px">
      <!-- The edit button styling -->
      <!-- <template v-slot:activator="{ on, attrs}"> 
        <v-btn
        color="amber"
        lighten
        class="mb-2"
        v-bind="attrs"
        v-on="on">
          ITEMITEMITEM
        </v-btn>
      </template> -->
  <!-- What is shown when the dialog box is opened -->
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
    <v-card-actions>
    <v-btn
    color="amber darken-6"
    text
    @click="closeDialog"
    >Cancel</v-btn>
    <v-btn
    color="amber darken-6"
    text
    @click="saveChanges"
    >Save</v-btn>
  </v-card-actions>
    </v-card>
    </v-dialog>
  </template>
    <!-- This is the templating for the edit and delete buttons in the "modify" column -->
    <template v-slot:item.modify="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="openDialog(item)"
      >
        ✏️
      </v-icon>
        <v-icon
        small
        class="mr-2"
        @click="deleteItem(item)"
      >
        🗑️
      </v-icon>
      </template>
    </v-data-table>
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
      val || this.closeDialog()
    },
  },

  methods: {
    closeDialog(){
      this.dialog = false;
      this.$nextTick(()=>{
        //Sets the edited item in state equal to a blank template item
        this.editedItem = Object.assign({}, this.blankItem)
      })
    },
    openDialog(item){
      //Sets the edited item in state equal to the current item being selected by the user
      this.editedItem = Object.assign({}, item)
      this.editedItem.id = item.id;
      this.dialog = true;
    },
    saveChanges(){
      // db.doc(something).set(this.editedItem)
      // .then(()=> {
        // console.log(db.collection("students").doc())
        console.log(this.editedItem.id);
        console.log(this.editedItem.firstName);
        console.log("Updated!")

      db.collection('students')
      .doc(this.editedItem.id)
      .set(this.editedItem)
      .then(() => {
        console.log('Document updated')
      })

        this.closeDialog();
    },
    deleteItem(item){
      db.collection('students').doc(item.id).delete();
      console.log(item.id);
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
