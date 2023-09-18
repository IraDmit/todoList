<template>
  <div id="app">
    <div class="container">
      <h1 class="border ttl">ToDo List</h1>
      <div class="content">
        <div class="left-col">
          <vc-date-picker
            v-model="test"
            @dayclick="onDayClick"
            locale="en"
            class="calendar"
          />
        </div>
        <div class="right-col border">
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
          <div v-else class="notice">
            <p>There are no tasks for this day, create a to-do list!</p>
          </div>
          <div class="next btn btn-primary" @click="nextDay">
            <div class="icon-right-open-outline"></div>
          </div>
          <div class="prev btn btn-primary" @click="prevDay">
            <div class="icon-right-open-outline"></div>
          </div>
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
  font-family: "Press Start 2P", cursive;
  background-image: url("https://klike.net/uploads/posts/2022-10/1666595471_1.png");
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding: 15px 0;
  .ttl {
    padding: 15px 20px;
    margin: 20px 0;
    margin-top: 0;
  }
  .content {
    display: flex;
    justify-content: space-between;

    .left-col {
      max-width: 350px;
      width: 100%;
      .calendar {
        font-family: "Press Start 2P", cursive;
        width: 100%;
      }
    }
    .right-col {
      max-width: calc(100% - 370px);
      width: 100%;
      position: relative;
      padding: 20px;
      .next {
        position: absolute;
        top: 20px;
        right: 10px;
        padding: 10px;
      }
      .prev {
        padding: 10px;
        position: absolute;
        top: 20px;
        left: 10px;
        transform: rotate(180deg);
      }
      .icon-right-open-outline {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .createList {
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          max-width: 400px;
          width: 100%;
          padding: 5px;
          border-radius: 10px;
          box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.137);
          border: 1px solid #d8d8d8;
        }
      }
      .notice {
        margin: 0 auto;
        margin-top: 70px;
        max-width: 620px;
        width: 100%;
      }
    }
    @media (max-width: 992px) {
      .right-col {
        .createList {
          margin-top: 45px;
        }
      }
    }
    @media (max-width: 764px) {
      display: flex;
      flex-direction: column;
      .left-col,
      .right-col {
        max-width: 100%;
        width: 100%;
      }
      .right-col {
        margin-top: 15px;
      }
      .createList {
        max-width: 380px;
        margin: 0 auto;
      }
    }
  }
}

// color: #42b983;
</style>
