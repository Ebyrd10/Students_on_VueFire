<template>
  <div class="student-table">
    <v-data-table
    :headers="headers"
    :items="students"
    :items-per-page="5"
    class="elevation-8"
    hide-default-footer
    :search="search"
    >
    <!-- Search Bar Template -->
    <template v-slot:top>
      <v-text-field
      v-model="search"
      label="Search"
      class="mx-4"
      ></v-text-field>
      <div id="table-header" class="amber darken-1">Students</div>
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
      ]
    };
  },

  firestore: {
    students: db.collection("students"),
  },

  name: "StudentTable",
};
</script>

<style>
</style>
