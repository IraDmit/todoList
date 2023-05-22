<template>
  <li :class="{ green: isChecked, red: !isChecked }">
    <div
      class="checkbox"
      @click="check"
      :class="{ 'icon-ok': isChecked, 'icon-cancel-1': !isChecked }"
    ></div>
    <input type="text" v-model="text" class="todo" />
    <div @click="changeItem" class="confirm icon-plus"></div>
    <div @click="deleteItem" class="delete icon-trash-empty"></div>
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
  width: 100%;
  display: flex;
  margin-bottom: 15px;
  background-color: #ebebeb;
  padding: 7px 7px;
  border-radius: 8px;
  align-items: center;
  font-family: "Caveat", cursive;
  font-weight: 400;
  font-size: 22px;
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
  }
  &.green {
    background-color: rgba(#51cf66, 0.6);
    input {
      text-decoration: line-through;
    }
  }
  &:focus {
    border: 2px solid #000;
  }
}
</style>
