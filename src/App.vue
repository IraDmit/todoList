<template>
  <div id="app">
    <h1>ToDo List</h1>
    <vue-inline-calendar
      class="vue-inline-calendar"
      @select-date="changeDate($event)"
    />
    <div class="container">
      <div class="createList" title="Create a new list">
        <input type="text" v-model="listName" />
        <div class="icon-plus" @click="createList"></div>
      </div>
      <template v-for="(list, key, idx) in lists">
        <app-list
          v-if="'data-' + selectedDate == key && selectedDate"
          :list="lists['data-' + selectedDate]"
          :keyObj="'data-' + selectedDate"
          @changeList="changeList"
          :key="idx"
        />
      </template>
    </div>
  </div>
</template>

<script>
import AppList from "./components/app-list.vue";
import VueInlineCalendar from "vue2-inline-calendar";
export default {
  components: { AppList, VueInlineCalendar },
  data() {
    return {
      // test: {
      //   '14': {
      //     name: asdasd
      //     items: [{}]
      //   }
      // }
      lists: localStorage.lists ? JSON.parse(localStorage.lists) : {},
      listName: "",
      selectedDate: new Date().getDate(),
    };
  },
  methods: {
    createList() {
      this.$set(this.lists, "data-" + this.selectedDate, {
        name: this.listName,
        items: [],
      });
    },
    changeList(arr, key) {
      this.lists[key].items = arr;
      localStorage.lists = JSON.stringify(this.lists);
    },
    changeDate(ev) {
      this.selectedDate = ev.getDate();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  overflow: hidden;
  .vue-inline-calendar {
    overflow-x: scroll;
    width: 100%;
  }
}

.createList {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// color: #42b983;
</style>
