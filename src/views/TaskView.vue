<!-- eslint-disable no-case-declarations -->
<!-- eslint-disable no-case-declarations -->
<template>
  <main>
    <h1>Date App</h1>
    <div id="field1">
      <label>Select FROM date</label>
      <input
        type="date"
        v-model="fromDate"
        id="fromDate"
        v-on:click="checkFromDate"
        @input="checkFromDate($event)"
      />
    </div>
    <div id="field2">
      <label>Select TO date</label>
      <input type="date" v-model="toDate" id="toDate" :disabled="buttonFlag" />
      <p v-if="checkDates" class="danger">
        Error!! don't select previous dates or same date
      </p>
    </div>
    <div id="Filters">
      <div>
        Filters 1
        <p>Get count by</p>
        <select v-model="selectedFilter1" @change="onChangeFilter1($event)">
          <option
            v-for="(countBy, index) in filter1"
            v-bind:value="countBy"
            :selected="countBy == selectedFilter1 ? 'selected' : ''"
            :key="index"
          >
            {{ countBy }}
          </option>
        </select>
      </div>
      <div>
        Filters 2
        <p>Get count of days by</p>
        <select v-model="selectedFilter2" @change="onChangeFilter2($event)">
          <option
            v-for="(countBy, index) in filter2"
            v-bind:value="countBy"
            :selected="countBy == selectedFilter2 ? 'selected' : ''"
            :key="index"
          >
            {{ countBy }}
          </option>
        </select>
      </div>
    </div>
    <div>
      <h2>view</h2>
      <button v-on:click="clear">clear</button>
      <button v-on:click="getDetails" :disabled="checkDates || emptyDates">
        submit
      </button>
      <p>From Date: {{ fromDate }}</p>
      <p>To Date: {{ toDate }}</p>
      <p>Count on {{ selectedFilter2 }}</p>
      <table class="tableBorder">
        <tr>
          <td>From Date</td>
          <td>To Date</td>
          <td>Filter 1</td>
          <td>Filter 2</td>
          <td>Days</td>
          <td>Hours</td>
          <td>Mins</td>
          <td>Seconds</td>
        </tr>
        <tr>
          <td>{{ fromDate }}</td>
          <td>{{ toDate }}</td>
          <td>{{ selectedFilter1 }}</td>
          <td>{{ selectedFilter2 }}</td>
          <td>
            <p v-if="selectedFilter2 == 'the number of days'">
              {{ countByDays }}
            </p>
          </td>
          <td>
            <p v-if="selectedFilter2 == 'the number of hours'">
              {{ countByHours }}
            </p>
          </td>
          <td>
            <p v-if="selectedFilter2 == 'the number of mins'">
              {{ countByMins }}
            </p>
          </td>
          <td>
            <p v-if="selectedFilter2 == 'the number of seconds'">
              {{ countBySeconds }}
            </p>
          </td>
        </tr>
      </table>
      <h1>Search History table</h1>
      <ul>
        <li v-for="(data, index) in history" :key="index">
          <p :key="index">
            {{ index + 1 }}) --- {{ data.toDate }} - {{ data.fromDate }} -
            {{ data.query }} - {{ data.value }}
          </p>
        </li>
      </ul>
    </div>
  </main>
</template>
<style>
.danger {
  color: red;
}
.tableBorder {
  border: 1px solid white;
}
.tableBorder td {
  border: 1px solid white;
}
</style>
<script>
import moment from "moment";

export default {
  data() {
    return {
      history: [],
      fromDate: "",
      toDate: "",
      buttonFlag: true,
      toFlag: true,
      selectedFilter1: "All days",
      selectedFilter2: "the number of days",
      countByDays: "",
      countByHours: "",
      countByMins: "",
      countBySeconds: "",
      filter1: ["All days", "Weekdays", "Weekends"],
      filter2: [
        "the number of days",
        "the number of hours",
        "the number of mins",
        "the number of seconds",
      ],
    };
  },
  methods: {
    clear() {
      this.toDate = "";
      this.fromDate = "";
      this.buttonFlag = true;
      this.history = [];
      this.selectedFilter1 = "All days";
      this.selectedFilter2 = "the number of days";
    },
    checkFromDate(event) {
      if (event.target.value != "") {
        return (this.buttonFlag = false);
      } else {
        return (this.buttonFlag = true);
      }
    },
    getDetails() {
      var x = new moment(this.toDate);
      var y = new moment(this.fromDate);
      this.selectedFilter1 = "All days";
      this.countByDays = moment.duration(x.diff(y)).asDays();
      this.countByHours = moment.duration(x.diff(y)).asHours();
      this.countByMins = moment.duration(x.diff(y)).asMinutes();
      this.countBySeconds = moment.duration(x.diff(y)).asSeconds();
      var obj3 = {
        toDate: this.toDate,
        fromDate: this.fromDate,
        query: this.selectedFilter1,
        value: this.countByDays,
      };
      this.history.push(obj3);
    },
    getOnChange(from, to) {
      this.countByDays = moment.duration(to.diff(from)).asDays();
      this.countByHours = moment.duration(to.diff(from)).asHours();
      this.countByMins = moment.duration(to.diff(from)).asMinutes();
      this.countBySeconds = moment.duration(to.diff(from)).asSeconds();
    },
    getByDays(days) {
      this.countByDays = days;
      this.countByHours = moment.duration(days) * 24;
      this.countByMins = moment.duration(days) * 24 * 60;
      this.countBySeconds = moment.duration(days) * 24 * 60 * 60;
    },
    dataStoreFilter1() {
      var obj1 = {
        toDate: this.toDate,
        fromDate: this.fromDate,
        query: this.selectedFilter1,
        value: this.countByDays,
      };
      this.history.push(obj1);
    },
    dataStoreFilter2() {
      var obj2 = {
        toDate: this.toDate,
        fromDate: this.fromDate,
        query: this.selectedFilter2,
        value: this.countByDays,
      };
      this.history.push(obj2);
    },
    onChangeFilter1() {
      this.selectedFilter2 = "the number of days";
      switch (this.selectedFilter1) {
        case "All days":
          this.getDetails();
          this.dataStoreFilter1();
          break;
        case "Weekdays":
          var weekdays = [];
          var count = 0;
          var currentDate = moment(this.fromDate);
          while (currentDate.isSameOrBefore(this.toDate)) {
            if (currentDate.day() !== 0 && currentDate.day() !== 6) {
              weekdays.push(currentDate.format("YYYY-MM-DD"));
              count++;
            }
            currentDate.add(1, "days");
          }
          this.getByDays(count - 1);
          this.dataStoreFilter1();
          break;
        case "Weekends":
          var weekends1 = [];
          var currentDate1 = moment(this.fromDate);
          var count1 = 0;

          while (currentDate1.isSameOrBefore(this.toDate)) {
            if (currentDate1.day() === 0 || currentDate1.day() === 6) {
              weekends1.push(currentDate1.format("YYYY-MM-DD"));
              count1++;
            }
            currentDate1.add(1, "days");
          }
          this.getByDays(count1);
          this.dataStoreFilter1();
          break;
      }
    },
    onChangeFilter2() {
      switch (this.selectedFilter2) {
        case "the number of days":
          this.selectedFilter2 = "the number of days";
          this.dataStoreFilter2();
          break;
        case "the number of hours":
          this.selectedFilter2 = "the number of hours";
          this.dataStoreFilter2();
          break;
        case "the number of mins":
          this.selectedFilter2 = "the number of mins";
          this.dataStoreFilter2();
          break;
        case "the number of seconds":
          this.selectedFilter2 = "the number of seconds";
          this.dataStoreFilter2();
          break;
      }
    },
  },
  computed: {
    checkDates() {
      if (moment(this.fromDate).diff(moment(this.toDate), "days") >= 0) {
        return true;
      } else {
        return false;
      }
    },
    emptyDates() {
      return this.fromDate == "" || this.toDate == "" ? true : false;
    },
  },
};
</script>
