<template>
  <div>
    <h3>{{list.name}}</h3>
    <div class="create" @click="createItem">+</div>
    <ul>
      <app-list-item
        v-for="(item, idx) in items"
        :key="idx"
        :item="item"
        :idx="idx"
        @changeItem="changeItem"
        @deleteItem="deleteItem"
      />
    </ul>
    
    <div class="progress" :style="{ '--progWidth': progress + '%' }"></div>
  </div>
</template>

<script>
import appListItem from './app-listItem.vue';
export default {
  components: { appListItem },
  props: {
    list: {
        type: Object,
        default: ()=>{}
    },
    idx:{
        type: Number,
        default:()=>{}
    }
  },
  data() {
    return {
      items: this.list.items ? this.list.items : [],
      progress: 0,
    };
  },
  methods: {
    createItem() {
      this.items.push({ checked: false, purpose: "" });
    },
    changeItem(obj, idx) {
      this.items[idx] = obj;
      this.$emit('changeList', this.items, this.idx)
      this.countProgress();
    },
    deleteItem(idx) {
      this.items.splice(idx, 1);
      this.$emit('changeList', this.items, this.idx)
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
  mounted() {
    this.countProgress();
  },
};
</script>

<style lang="scss" scoped>
ul {
  max-width: 800px;
  width: 100%;
}

.progress {
  width: 100%;
  height: 15px;
  border: 1px solid #000;
  position: relative;
  &::before {
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
