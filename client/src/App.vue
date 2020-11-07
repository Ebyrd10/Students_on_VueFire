<template>
  <v-app>
    <v-app-bar
      app
      color="amber darken-1"
    >
    </v-app-bar>
    <v-main>
      <StudentTable/>
      <AddForm/>
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
  overflow: hidden;
}
#app{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.student-table{
  flex: 3;
  margin: 5rem;
  background-color: var(--secondary-color);
}
.table-header{
  color: red;
}
</style>