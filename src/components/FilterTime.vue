<template>
  <div>
    Filters 2
    <p>Get count by time</p>
    <select v-model="field" @change="changeTime($event)" :disabled="disabled">
      <option
        v-for="(time, index) in timeOptions"
        v-bind:value="time"
        :selected="time == selectedFilterByTime"
        :key="index"
      >
        {{ time }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: "FilterTime",
  data() {
    return {
      field: this.model,
    };
  },
  props: {
    model: { type: String },
    changeTime: { type: Function },
    timeOptions: { type: Array },
    selectedFilterByTime: { type: String },
    disabled: { type: Boolean },
  },
};
</script>
