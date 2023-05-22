<template>
  <div>
    <label>Select {{ flag == true ? "To" : "From" }} date</label>
    <input
      type="date"
      v-model="field"
      @input="method($event, flag)"
      :disabled="disabled"
    />
    <p v-if="checkDates" class="danger">
      Error!! don't select previous dates or same date
    </p>
  </div>
</template>
<script>
export default {
  name: "InputDate",
  data() {
    return {
      field: this.model,
    };
  },
  props: {
    model: { type: String },
    method: { type: Function },
    flag: { type: Boolean },
    checkDates: { type: Boolean },
    disabled: { type: Boolean },
  },
};
</script>
