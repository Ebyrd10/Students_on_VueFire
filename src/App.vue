<template>
  <v-app>
    <v-app-bar
      app
      color="amber darken-1"
      height = 70
    >
    <h1 class="mx-auto white--text mb-2 font-weight-medium">
      Students on VueFire 🔥
      </h1>
    </v-app-bar>
    <v-main id="main-window">
      <v-row>
      <v-col>
        <!-- The main table connected to the database -->
      <StudentTable/>
      </v-col>
      <v-col>
        <!-- The form which allows a user to add a new entry to the database -->
      <AddForm/>
      </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import StudentTable from './components/StudentTable.vue';
import AddForm from './components/AddForm.vue';

export default {
  name: 'App',
  components: {
    StudentTable,
    AddForm,
  },
};
</script>
<style>
body {
  background: #9E9E9E;
  font-family: Arial, Helvetica, sans-serif;
  color: #E0E0E0;
}
</style>