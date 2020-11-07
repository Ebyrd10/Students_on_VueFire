<template>
  <div id="app">
    <StudentTable/>
  </div>
</template>

<script>
import StudentTable from './components/StudentTable.vue'


export default {
  name: 'App',
  components: {
    StudentTable
  }
}
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
#app{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.student-table{
  flex: 3;
  margin: 5rem;

}
</style>
