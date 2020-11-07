<template>
  <div>
      <v-form
      ref="form"
      >
      <v-text-field
      v-model="newFirstName"
      label="First Name"
      required
      ></v-text-field>

      <v-text-field
      v-model="newLastName"
      label="Last Name"
      required
      ></v-text-field>

      <v-text-field
      v-model="newAge"
      label="Age"
      ></v-text-field>

    <v-btn
    color="green"
    class="mr-4"
    @click="addItem"
    >Add</v-btn>
      </v-form>
  </div>
</template>

<script>

//importing firestore database and timestamps for querying and adding to the database
import { db, serverTimestamp } from "../db.js";


export default {
    name: 'AddForm',
data () {
    return {
    newFirstName: "",
    newLastName: "",
    newAge: "",
    };
},

methods: {
    addItem() {

        //Grabbing the student collection from firestore
        const collectionRef = db.collection('students')
        const newFirstName = this.newFirstName;
        const newLastName = this.newLastName;
        const newAge = this.newAge;

        

        //Adding a new entry to the student collection with an auto ID created by calling the add() function
        collectionRef.add({
            firstName: newFirstName,
            lastName: newLastName,
            age: newAge,
            createdAt: serverTimestamp()
        });

        this.newFirstName = "";
        this.newLastName = "";
        this.newAge= "";

    },
},

firestore: {
    students: db.collection("students"),
  },

}
</script>

<style>

</style>