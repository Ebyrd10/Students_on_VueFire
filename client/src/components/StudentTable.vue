<template>
  <div class="student-table">
    <div class="row" v-for="(student, id) in students" v-bind:key="id">
      <div class="tableItem"> {{ student.firstName }}</div>
      <div class="tableItem"> {{ student.lastName }}</div>
      <div class="tableItem"> {{ student.age }}</div>
    </div>
    <h1>{{ students }}</h1>
  </div>
</template>

<script>
import { db } from "../db.js";

export default {
  data() {
    return {
      students: [],
    };
  },

  firestore: {
    students: db.collection("students"),
  },

  name: "StudentTable",
};
</script>

<style scoped>
.row{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.tableItem{
 margin: 2.5rem;
 background-color: var(--secondary-color);
}
</style>
