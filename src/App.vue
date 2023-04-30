<template>
  <div id="app">
    <h1>ToDo List</h1>
    <div class="create" @click="createItem">+</div>
    <ul>
      <app-list-item
        v-for="(item, idx) in items"
        :key="idx"
        :item="item"
        :idx="idx"
        @changeItem="changeItem"
      />
    </ul>
  </div>
</template>

<script>
import appListItem from "./components/app-listItem.vue";
export default {
  components: { appListItem },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    createItem() {
      this.items.push({ checked: false, purpose: "" });
    },
    changeItem(obj, idx) {
      this.items[idx] = obj;
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

// color: #42b983;

ul {
  max-width: 800px;
  width: 100%;
}
</style>
