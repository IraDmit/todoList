<template>
  <div id="app">
    <h1 class="border ttl">ToDo List</h1>
    <div class="container content">
      <div class="left-col">
        <vc-calendar v-model="test" @dayclick="onDayClick" />
      </div>
      <div class="right-col">
        <div class="createList" title="Create a new list">
          <input type="text" v-model="listName" />
          <div class="icon-plus" @click="createList"></div>
        </div>
        <div class="wrp" v-if="lists && lists[`data-${selectedDate}`]">
          <template v-for="(list, key, idx) in lists">
            <app-list
              v-if="'data-' + selectedDate == key"
              :list="lists['data-' + selectedDate]"
              :keyObj="'data-' + selectedDate"
              @changeList="changeList"
              :key="idx"
            />
          </template>
        </div>
        <div v-else>There are no tasks for this day, create a to-do list!</div>
        <div class="next btn btn-primary" @click="nextDay">
          <div class="icon-right-open-outline"></div>
        </div>
        <div class="prev btn btn-primary" @click="prevDay">
          <div class="icon-right-open-outline"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppList from "./components/app-list.vue";

export default {
  components: { AppList },
  data() {
    return {
      lists: localStorage.lists ? JSON.parse(localStorage.lists) : {},
      listName: "",
      selectedDate: new Date().getDate(),
      test: null,
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
    nextDay() {
      this.selectedDate += 1;
    },
    prevDay() {
      this.selectedDate -= 1;
    },
    onDayClick(day) {
      this.selectedDate = day.day;
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
  .ttl {
    padding: 15px 20px;
    margin: 20px 0;
  }
  .content {
    display: flex;
    justify-content: space-between;
    .left-col {
      max-width: 350px;
      width: 100%;
      padding: 20px;
    }
    .right-col {
      max-width: calc(100% - 350px);
      width: 100%;
      position: relative;
      .next {
        position: absolute;
        top: 50%;
        right: 30px;
      }
      .prev {
        position: absolute;
        top: 50%;
        left: 30px;
        transform: rotate(180deg);
      }
      .createList {
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          max-width: 400px;
          width: 100%;
        }
      }
    }
  }
}

// color: #42b983;
</style>
