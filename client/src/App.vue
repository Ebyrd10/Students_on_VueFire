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
      <StudentTable/>
      </v-col>
      <v-col>
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

  data: () => ({
    //
  }),
};
</script>
<style>
:root {
  --primary-color: #9E9E9E;
  --secondary-color: #00C853;
  --tertiary-color: #E0E0E0;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background: var(--primary-color);
  font-family: Arial, Helvetica, sans-serif;
  color: var(--tertiary-color);
}
#main-window{
  /* margin: 5rem; */
}
</style>