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
      <!-- The save and cancel buttons on the edit dialogue -->
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
//Bringing in the firestore db
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
      //a blank object for the purpose of resetting the currently edited item to blank after item changes have been saved
      blankItem: {
        firstName: "",
        lastName: "",
        age: ""
    },
    // This is the current item being edited
    editedItem: {
        firstName: "",
        lastName: "",
        age: ""
    },
    //This boolean controls whether or not the 'edit student' dialog box is open or closed
    dialog: false,
    };
  },
  //A watcher to make extra sure that the dialog box opens and closes as intended
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
      db.collection('students')
      //look for the editedItem id since it should be equal to the id of the actual document we're looking for
      .doc(this.editedItem.id)
      //then set the new edited item to override the old item, with the unique id not changing
      .set(this.editedItem)
      .then(() => {
        console.log('Document updated')
      })
        this.closeDialog();
    },
    deleteItem(item){
      //Deletes a student entry based on the id of the prop student
      db.collection('students').doc(item.id).delete();
      console.log(item.id);
    }
  },

  //Bringing in the database 
  firestore: {
    students: db.collection("students"),
  },

  name: "StudentTable",
};
</script>

<style>
</style>
