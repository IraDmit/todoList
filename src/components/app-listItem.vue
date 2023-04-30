<template>
  <li>
    <div class="checkbox" @click="isChecked = !isChecked">{{ item.checked }}</div>
    <input type="text" v-model="text" class="todo" />
    <div @click="changeItem" class='confirm'>подтвердить</div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    idx:{
        type: Number,
        default:()=>{},
    }
  },
  data() {
    return {
      text: this.item.text,
      isChecked: this.item.checked 
    };
  },
  methods: {
    changeItem() {
        this.$emit('changeItem', {'checked': this.isChecked, "purpose": this.text}, this.idx)
    }
  },
};
</script>

<style lang="scss" scoped>
li{
    display: flex;
    margin-bottom: 15px;
    background-color: #EBEBEB;
    padding: 10px 7px;
    border-radius: 8px;
    .checkbox{
      border: 1px solid #000;
      padding: 5px;
      margin-right: 10px;
      cursor: pointer;
    }
    .todo{
      padding: 5px;
      border: none;
      background: none;
      width: 100%;
    }
}
</style>
