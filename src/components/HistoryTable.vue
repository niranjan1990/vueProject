<template>
  <div>
    <h1>Search History table</h1>
    <table class="tableBorder">
      <tr>
        <td>From Date</td>
        <td>To Date</td>
        <td>Filter 1</td>
        <td>Filter 2</td>
        <td>Results</td>
      </tr>
      <tr v-for="(data, index) in history" :key="index">
        <td>{{ data.fromDate }}</td>
        <td>{{ data.toDate }}</td>
        <td>{{ data.filterByDay }}</td>
        <td>{{ data.filterByTime }}</td>
        <td>
          {{ data.value }}
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "HistoryTable",
  props: {
    history: { type: Array },
  },
};
</script>
