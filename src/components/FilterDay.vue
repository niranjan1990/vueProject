<template>
  <div>
    Filters 1
    <p>Get count by days</p>
    <select v-model="field" @change="changeDay($event)" :disabled="disabled">
      <option
        v-for="(day, index) in dayOptions"
        v-bind:value="day"
        :selected="day == selectedFilterByDay ? 'selected' : ''"
        :key="index"
      >
        {{ day }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: "FilterDay",
  data() {
    return {
      field: this.model,
    };
  },
  props: {
    model: { type: String },
    changeDay: { type: Function },
    dayOptions: { type: Array },
    selectedFilterByDay: { type: String },
    disabled: { type: Boolean },
  },
};
</script>
