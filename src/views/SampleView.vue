<template>
  <main>
    <h4>Nest component</h4>
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
    <nest-component
      v-bind:formElement="formElement"
      v-bind:title="title"
      v-on:changeTitle="updated($event)"
    ></nest-component>
    <h1>Sample View of Parent component {{ title }}</h1>
    <p>Bus data here {{ titleBus }}</p>
    <slot-helper>
      <h2 slot="msg1">{{ msg1 }}</h2>
      <h3 slot="msg2">{{ msg2 }}</h3>
      <h4 slot="msg3">{{ msg3 }}</h4>
      <h5 slot="msg4">{{ msg4 }}</h5>
      <h6 slot="msg5">{{ msg5 }}</h6>
    </slot-helper>
    <button v-on:click="switchComponent">
      Click to make components dynamic
    </button>
  </main>
</template>
<style scoped>
h1 {
  color: yellow;
}
</style>
<script>
import DynamicComponent from "@/components/DynamicComponent.vue";
import SlotHelper from "@/components/SlotHelper.vue";
import NestComponent from "@/components/NestComponent.vue";
import { bus } from "@/main.js";

export default {
  // eslint-disable-next-line no-dupe-keys
  components: { "nest-component": NestComponent, "slot-helper": SlotHelper, "dynamic-component": DynamicComponent },
  data: function () {
    return {
      component: "nest-component",
      msg1: "Here's how slots work",
      msg2: "Here is a form",
      msg3: "Fill out your credentials",
      msg4: "set username",
      msg5: "set password",
      titleBus: "",
      title: "Form Component",
      formElement: [
        { name: "Text", description: "Takes only text input", show: false },
        { name: "Radio", description: "Takes only one choice", show: false },
        {
          name: "CheckBox",
          description: "Takes multiple choices",
          show: false,
        },
        {
          name: "SingleSelect",
          description: " Dropdown that takes only one option",
          show: false,
        },
        {
          name: "MultiSelect",
          description: "Dropdown that takes multiple options",
          show: false,
        },
      ],
    };
  },
  methods: {
    updated: function (text) {
      this.title = text;
    },
    switchComponent: function () {
      this.component =
        this.component == "slot-helper" ? "dynamic-component" : "slot-helper";
    },
  },
  created() {
    bus.$on("titleChange", (text) => {
      this.titleBus = text;
    });
  },
};
</script>
