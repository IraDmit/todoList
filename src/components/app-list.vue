<template>
<div>

  <div class="list" v-if="!!list">
    <h3 class="name">{{ list.name }}</h3>
    <div class="create" @click="createItem">
      <p>add a task</p>
      <div class="icon-plus btn" ></div>
    </div>
    <ul>
      <app-list-item
        v-for="(item, idx) in items"
        :key="idx"
        :item="item"
        :idx="idx"
        @changeItem="changeItem"
        @deleteItem="deleteItem"
      ></app-list-item>
    </ul>
    <div class="progress" :style="{ '--progWidth': progress + '%' }"></div>
  </div>
  
</div>
</template>

<script>
import appListItem from "./app-listItem.vue";
export default {
  components: { appListItem },
  props: {
    list: {
      type: [Object, Boolean],
      default: () => {},
    },
    keyObj: {
      type: String,
      default: () => {},
    },
  },
  data() {
    return {
      items:
        this.list?.items && typeof this.list === "object"
          ? this.list.items
          : [],
      progress: 0,
    };
  },
  mounted() {
    if (this.list) this.countProgress();
  },
  methods: {
    createItem() {
      this.items.push({ checked: false, purpose: "" });
    },
    changeItem(obj, idx) {
      this.items[idx] = obj;
      this.$emit("changeList", this.items, this.keyObj);
      this.countProgress();
    },
    deleteItem(idx) {
      this.items.splice(idx, 1);
      this.$emit("changeList", this.items, this.keyObj);
      this.countProgress();
    },
    countProgress() {
      const length = this.items.length;
      let count = 0;
      this.items.forEach((element) => {
        if (element.checked) count++;
      });
      const selected = count;
      this.progress = (selected * 100) / length;
    },

  },
};
</script>

<style lang="scss" scoped>
.list:not(:last-of-type) {
  border-bottom: 2px solid #ebebeb;
}
.list {
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.create {
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
}

.create {
  background-color: #ebebeb;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #000;
  cursor: pointer;
  margin-left: auto;
}
ul {
  padding: 0;
}

.progress {
  width: 100%;
  height: 15px;
  border: 1px solid #000;
  position: relative;

  &::before {
    transition-duration: 0.3s;
    content: "";
    position: absolute;
    width: var(--progWidth);
    height: 100%;
    top: 0px;
    left: 0;
    background-color: #42b983;
  }
}
</style>
