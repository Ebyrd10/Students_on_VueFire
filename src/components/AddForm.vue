<template>
  <v-card id="addForm" class="
  d-flex
  pa-6
  flex-column
  ">
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

    <!-- Google recaptcha in the form of the vue-recaptcha package -->
    <vue-recaptcha 
    sitekey=6LcNlOAZAAAAAPd_umEDPYHm4oJBjN89GK2UkOsx
    ref="recaptcha"
    @verify = "onVerify"
    @expired = "onExpired"
    @error = "onError"
    size="invisible"
    >
    <v-btn
    color="amber darken-1"
    class="mr-4"
    @click="addItem"
    >Add</v-btn>
    </vue-recaptcha>
      </v-form>
  </v-card>
</template>

<script>

//importing firestore database and timestamps for querying and adding to the database
import { db, serverTimestamp } from "../db.js";
import VueRecaptcha from 'vue-recaptcha';
import axios from 'axios';


export default {
    name: 'AddForm',
    components: { VueRecaptcha },
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
        //resets the new entry data to blank
        this.newFirstName = "";
        this.newLastName = "";
        this.newAge= "";

    },
    onSubmit(){
        this.$refs.invisibleRecaptcha.execute()
    },
    // onVerify(){
    //     return;
    onVerify(token){
        //This is the primary recaptcha function from vue-recaptch,
        // it should send a token from recaptcha to the cloud function which then 'asks' google if this token is valid, at which point
        //the onVerify functions either allows a human to add to the database or rejects a bot from adding to the database

        return new Promise((resolve, reject) => {

             //location of the cloud function
            const cloudFunctionURL = 'https://us-central1-students-on-vuefire-17fe1.cloudfunctions.net/sendToGoogle'
            const data = {
              secret: '6LcNlOAZAAAAAMbA8Ml2t5gMwQJQhTfqlKMDduOi',
              itemToSend: token

            }
            axios.post(cloudFunctionURL, data)
            .then((response) => {
                console.log(response)
                this.addItem()
                resolve(true)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    onExpired(){
        console.log("reCAPTCHA Expired")
        this.$refs.recaptcha.reset();
        console.log("reCAPTCHA Reset")
    },
    onError(){
        console.log("reCAPTCHA Error")
    },
},

//this fills the student array with the real time data from the db
firestore: {
    students: db.collection("students"),
  },

}
</script>

<style scoped>
.v-card{
    margin: 5rem;
    width: 50%;
}
</style>