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

        this.newFirstName = "";
        this.newLastName = "";
        this.newAge= "";

    },
    onSubmit(){
        this.$refs.invisibleRecaptcha.execute()
    },
    onVerify(response){
        console.log('reCAPTCHA Verified with response: ' + response)
        // axios.post("/token",{
        //     recaptchaToken: response
        // }).then((response => {
        //     console.log(response.data.message)
        // }))
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