<!-- eslint-disable prettier/prettier -->
<template>
  <div class="about">
    <h1>Profile</h1>
    <div class="wrapper">
      <div class="greetings">
        <input type="text" :value="name" />
        <h1>{{ welcome() }}</h1>
        <h2>Name : {{ name }}</h2>
        <h3>Age : {{ age }}</h3>
        <h4>School: {{ school }}</h4>
        <a :href="github" target="_blank" class="p-10">Github</a>
        <p v-html="linkedin"></p>
      </div>
      <div class="events">
        <h1>Events</h1>
        <h5>{{ age }}</h5>
        <div>
          <p>Single click</p>
          <button @click="add(1)">Add a year</button>
          <button v-on:click="subtract(1)">Subtract a year</button>
        </div>
        <div>
          <p>Double click</p>
          <button v-on:dblclick="add(10)">Add 10 year</button>
          <button v-on:dblclick="subtract(10)">Subtract 10 year</button>
        </div>
        <div>
          <p>Single click once</p>
          <button v-on:click.once="add(10)">Add 10 year</button>
          <button v-on:click.once="subtract(10)">Subtract 10 year</button>
          <a :href="github" v-on:click.prevent="test" class="p-10"
            >Click here</a
          >
        </div>
        <div>
          <p v-bind:class="compClass">
            Hover here to get coordinates and dynamic css
          </p>
          <p v-if="toggleGreen">Great you have green color</p>
          <p v-else-if="toggleRed">Great you have red color</p>
          <div
            id="hover"
            class="box"
            v-bind:class="{ toggleGreen: toggleGreen, toggleRed: toggleRed }"
            v-on:mousemove="getCoordinates"
            v-on:mouseout="getCoordinatesOut"
          >
            {{ x }},{{ y }}
          </div>
        </div>
        <div>
          <p>Keyboard events {{ keyName }}</p>
          <input type="text" v-model="keyName" v-on:keyup.enter="alertKey" />
        </div>
        <div>
          <p>Computed props</p>
          Age is {{ age }}
          <button v-on:click="a++">Add 1 year to A</button>
          <button v-on:click="b++">Add 1 year to B</button>
          <p>A : {{ a }}</p>
          <p>B : {{ b }}</p>
          <p>Age + A = {{ addToA }}</p>
          <p>Age + B = {{ addToB }}</p>
        </div>
        <div>
          <h2>Play with arrays</h2>
          <p>i love {{ fruits.length }} fruits which are</p>
          <ul>
            <li v-for="(fruit,index) in fruits" :key="index">{{ fruit }}</li>
          </ul>
          <p>my luv towards sports</p>
          <template v-for="(sport,index) in sports" >
            <p :key="index">{{index+1}}) i play {{sport.name}} on {{sport.day}}</p>
          </template>
        </div>
        <testComp></testComp>
        <AboutUs></AboutUs>
      </div>
    </div>
  </div>
</template>

<style>
h1 {
color: purple;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    align-items: center;
  }
  .p-10 {
    padding: "10px";
  }
}
</style>
<script>
import AboutUs from "@/components/AboutUs.vue";

export default {
  components: { AboutUs: AboutUs },
  data() {
    return {
      name: "Niranjan",
      keyName: "",
      age: 32,
      school: "Golden Gate University",
      github: "https://github.com/niranjan1990",
      linkedin:
        '<a href="https://www.linkedin.com/in/n-niranjan-a4886729/" target="_blank">LinkedIn</a>',
      x: 0,
      y: 0,
      a: 0,
      b: 0,
      toggleGreen: true,
      toggleRed: false,
      fruits: ["mangos", "pineapple", "jackfruit", "apple"],
      sports: [
        { name: "football", day: "monday" },
        { name: "ping pong", day: "tuesday" },
        { name: "badminton", day: "wednesday" },
        { name: "volleyball", day: "thursday" },
        { name: "cricket", day: "friday" },
      ],
    };
  },
  methods: {
    welcome() {
      var d = new Date();
      var time = d.getHours();
      var msg =
        time < 12
          ? "Morning"
          : time <= 18 && time >= 12
          ? "Afternoon"
          : "Night";

      return "Good " + msg;
    },
    add(num) {
      return (this.age += num);
    },
    subtract(num) {
      return (this.age -= num);
    },
    getCoordinates(event) {
      this.x = event.offsetX;
      this.y = event.offsetY;
      this.toggleGreen = true;
      this.toggleRed = false;
    },
    getCoordinatesOut() {
      this.x = event.offsetX;
      this.y = event.offsetY;
      this.toggleGreen = false;
      this.toggleRed = true;
    },
    test() {
      alert("hi preventing");
    },
    alertKey() {
      alert(this.keyName);
    },
  },
  computed: {
    addToA() {
      console.log("a");
      return this.age + this.a;
    },
    addToB() {
      console.log("b");
      return this.age + this.b;
    },
    compClass() {
      return { toggleGreen: this.toggleGreen, toggleRed: this.toggleRed };
    },
  },
};
</script>
