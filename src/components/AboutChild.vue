<template>
  <div class="greetings">
    <h1>About Child component globally</h1>
    <button v-on:click="error = !error">Toggle error</button>
    <button v-on:click="success = !success">Toggle success</button>
    <p v-show="error">there is an error</p>
    <p v-show="success">Yo u rock!!!</p>
    </br>
    <input type="text" ref="name"/>
    <p>I submiiting the text {{text}}</p>
    <button v-on:click="form">Submit</button>
    <div ref="sampleVue">accessing innerhtml in console</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      error: false,
      success: false,
      text: ""
    };
  },
  methods:{
  form:function(){
  console.log(this.$refs.name.value,this.$refs.sampleVue.innerText)
  this.text = this.$refs.name.value
  }
  }
};
</script>
