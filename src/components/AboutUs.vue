<template>
  <div class="greetings">
    <h1>About Us component registering from locally {{ name }}</h1>
    <p>Recomponent1</p>
    <simpleComponent></simpleComponent>
    <p>Recomponent2</p>
    <simpleComponent></simpleComponent>
  </div>
</template>
<script>
var data = {
  name: "Napster",
};
export default {
  data: function () {
    return {
      name: "nishu",
    };
  },
  components: {
    simpleComponent: {
      template:
        "<p>hi you are viewing resuable component {{this.name}} <button v-on:click='changeName'>Change name</button></p>",
      data: function () {
        return data;
      },
      methods: {
        changeName: function () {
          this.name = this.name == "niranjan" ? "Napster" : "niranjan";
        },
      },
    },
  },
};
</script>
