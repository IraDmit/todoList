<template>
  <div id="app">
    <h1>ToDo List</h1>
    <div class="createList" @click="createList">Create new list</div>
    <input type="text" v-model="listName" />
    <app-list v-for="(list, idx) in lists" :key="idx" :list="list" :idx="idx" @changeList="changeList" />
  </div>
</template>

<script>
import AppList from "./components/app-list.vue";
export default {
  components: { AppList },
  data() {
    return {
      lists: localStorage.lists ? JSON.parse(localStorage.lists) : [],
      listName: "",
    };
  },
  methods: {
    createList() {
      this.lists.push({ name: this.listName, items: [] });
    },
    changeList(arr, idx){
      this.lists[idx].items = arr
      localStorage.lists = JSON.stringify(this.lists)
    }
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

// color: #42b983;
</style>
