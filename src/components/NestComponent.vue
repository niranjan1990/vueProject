<template>
  <div id="nest">
    <h2>nested component diff form elements {{ text }}</h2>
    <ul>
      <li v-for="(form, index) in formElement" :key="index">
        <p v-on:click="form.show = !form.show">
          {{ form.name }} - click here to see more
        </p>
        <p v-show="form.show">{{ form.description }}</p>
      </li>
    </ul>
    <button v-on:click="deleteItem">Delete Element</button>
    <button v-on:click="addItem">Add Element</button>
    <button v-on:click="changeTitle">Change Title</button>
  </div>
</template>
<script>
import { bus } from "@/main.js";
export default {
  props: {
    formElement: {
      type: Array,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      text: this.title,
    };
  },
  methods: {
    deleteItem: function () {
      this.formElement.pop();
    },
    addItem: function () {
      this.formElement.push({
        name: "newElement",
        description: "new desc",
        show: false,
      });
    },
    changeTitle: function () {
      this.text = "title changed";
      this.$emit("changeTitle", "Title Changed child to parent");
      bus.$emit("titleChange", "Title change by Bus");
    },
  },
  //lifecycle
  /*beforeCreate: function () {
    alert("life cycle method beforeCreate is called");
  },
  created: function () {
    alert("life cycle method created is called");
  },
  beforeMount: function () {
    alert("life cycle method beforeMount is called");
  },
  mounted: function () {
    alert("life cycle method mounted is called");
  },
  beforeUpdate: function () {
    alert("life cycle method beforeUpdate is called");
  },
  updated: function () {
    alert("life cycle method updated is called");
  },*/
};
</script>
