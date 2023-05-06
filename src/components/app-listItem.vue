<template>
  <li :class="{ green: isChecked, red: !isChecked }">
    <div
      class="checkbox"
      @click="check"
      :class="{ 'icon-ok': isChecked, 'icon-cancel': !isChecked }"
    ></div>
    <input type="text" v-model="text" class="todo" />
    <div @click="changeItem" class="confirm icon-plus"></div>
    <div @click="deleteItem" class="delete icon-trash"></div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    idx: {
      type: Number,
      default: () => {},
    },
  },
  data() {
    return {
      text: this.item.purpose,
      isChecked: this.item.checked,
    };
  },
  methods: {
    changeItem() {
      this.$emit(
        "changeItem",
        { checked: this.isChecked, purpose: this.text },
        this.idx
      );
    },
    deleteItem() {
      this.$emit("deleteItem", this.idx);
    },
    check() {
      this.isChecked = !this.isChecked;
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  display: flex;
  margin-bottom: 15px;
  background-color: #ebebeb;
  padding: 10px 7px;
  border-radius: 8px;
  align-items: center;
  .checkbox {
    padding: 1px;
    margin-right: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .todo {
    padding: 5px;
    border: none;
    background: none;
    width: 100%;
  }
  .confirm,
  .delete {
    cursor: pointer;
  }
  &.red {
    background-color: rgba(#e34234, 0.6);
    text-decoration: line-through;
  }
  &.green {
    background-color: rgba(#51cf66, 0.6);
  }
}
</style>
