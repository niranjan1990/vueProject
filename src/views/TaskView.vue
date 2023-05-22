<template>
  <main>
    <h1>Date App</h1>
    <InputDate
      :model="fromDate"
      :method="checkEmpty"
      :flag="false"
      :checkDates="false"
      :disabled="false"
    />
    <InputDate
      :model="toDate"
      :method="checkEmpty"
      :flag="true"
      :checkDates="checkDates"
      :disabled="buttonFlag"
    />
    <div>
      <FilterDay
        :model="selectedFilterByDay"
        :changeDay="onChangeByDay"
        :dayOptions="filterByDay"
        :selectedFilterByDay="selectedFilterByDay"
        :disabled="emptyDates || checkDates"
      />
      <FilterTime
        :model="selectedFilterByTime"
        :changeTime="onChangeByTime"
        :timeOptions="filterByTime"
        :selectedFilterByTime="selectedFilterByTime"
        :disabled="emptyDates || checkDates"
      />
    </div>
    <div>
      <h2>view</h2>
      <button v-on:click="clear">clear</button>
      <button v-on:click="getDetails" :disabled="checkDates || emptyDates">
        submit
      </button>
      <p>Results</p>
      <table class="tableBorder">
        <tr>
          <td>From Date</td>
          <td>To Date</td>
          <td>Count by days</td>
          <td>Count by time</td>
          <td>Days</td>
          <td>Hours</td>
          <td>Mins</td>
          <td>Seconds</td>
        </tr>
        <tr>
          <td>{{ fromDate }}</td>
          <td>{{ toDate }}</td>
          <td>{{ selectedFilterByDay }}</td>
          <td>{{ selectedFilterByTime }}</td>
          <td>
            <p v-if="selectedFilterByTime == 'the number of days'">
              {{ countByDays }}
            </p>
          </td>
          <td>
            <p v-if="selectedFilterByTime == 'the number of hours'">
              {{ countByHours }}
            </p>
          </td>
          <td>
            <p v-if="selectedFilterByTime == 'the number of mins'">
              {{ countByMins }}
            </p>
          </td>
          <td>
            <p v-if="selectedFilterByTime == 'the number of seconds'">
              {{ countBySeconds }}
            </p>
          </td>
        </tr>
      </table>
      <HistoryTable :history="history" />
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
import InputDate from "@/components/InputDate.vue";
import FilterDay from "@/components/FilterDay.vue";
import FilterTime from "@/components/FilterTime.vue";
import HistoryTable from "@/components/HistoryTable.vue";

export default {
  components: { InputDate, FilterDay, FilterTime, HistoryTable },
  data() {
    return {
      history: [],
      fromDate: "",
      toDate: "",
      buttonFlag: true,
      toFlag: true,
      selectedFilterByDay: "All days",
      selectedFilterByTime: "the number of days",
      countByDays: "",
      countByHours: "",
      countByMins: "",
      countBySeconds: "",
      filterByDay: ["All days", "Weekdays", "Weekends"],
      filterByTime: [
        "the number of days",
        "the number of hours",
        "the number of mins",
        "the number of seconds",
      ],
    };
  },
  methods: {
    /* reset the fields and clear history table */
    clear() {
      this.toDate = "";
      this.fromDate = "";
      this.buttonFlag = true;
      this.history = [];
      this.selectedFilterByDay = "All days";
      this.selectedFilterByTime = "the number of days";
    },
    /* set and check empty fields */
    checkEmpty(event, flag) {
      if (flag == true) {
        this.toDate = event.target.value;
      } else {
        this.fromDate = event.target.value;
      }
      if (event.target.value != "") {
        return (this.buttonFlag = false);
      } else {
        return (this.buttonFlag = true);
      }
    },
    /* get all details from selected range */
    getDetails() {
      this.selectedFilterByDay = "All days";
      this.selectedFilterByTime = "the number of days";
      let to = new moment(this.toDate);
      let from = new moment(this.fromDate);
      let duration = moment.duration(to.diff(from));
      this.countByDays = duration.asDays();
      this.countByHours = duration.asHours();
      this.countByMins = duration.asMinutes();
      this.countBySeconds = duration.asSeconds();
      let tableData = {
        fromDate: this.fromDate,
        toDate: this.toDate,
        filterByDay: this.selectedFilterByDay,
        filterByTime: this.selectedFilterByTime,
        value: this.countByDays,
      };
      this.history.push(tableData);
    },
    /* get all details by days */
    getByDays(days) {
      this.countByDays = days;
      let dayDuration = moment.duration(days);
      this.countByHours = dayDuration * 24;
      this.countByMins = dayDuration * 24 * 60;
      this.countBySeconds = dayDuration * 24 * 60 * 60;
    },
    /* store data to history array by days */
    dataStoreByDay() {
      let dataByDay = {
        fromDate: this.fromDate,
        toDate: this.toDate,
        filterByDay: this.selectedFilterByDay,
        filterByTime: this.selectedFilterByTime,
        value: this.countByDays,
      };
      this.history.push(dataByDay);
    },
    /* store data to history array by time */
    dataStoreByTime() {
      let time;
      switch (this.selectedFilterByTime) {
        case "the number of days":
          time = this.countByDays;
          break;
        case "the number of hours":
          time = this.countByHours;
          break;
        case "the number of mins":
          time = this.countByMins;
          break;
        case "the number of seconds":
          time = this.countBySeconds;
          break;
      }
      let dataByTime = {
        fromDate: this.fromDate,
        toDate: this.toDate,
        filterByDay: this.selectedFilterByDay,
        filterByTime: this.selectedFilterByTime,
        value: time,
      };
      this.history.push(dataByTime);
    },
    /* onChange function for filtering by days which is first filter */
    onChangeByDay(event) {
      this.selectedFilterByTime = "the number of days";
      this.selectedFilterByDay = event.target.value;
      let currentDate = moment(this.fromDate);
      switch (this.selectedFilterByDay) {
        case "All days":
          this.getDetails();
          this.dataStoreByDay();
          break;
        case "Weekdays": {
          let weekdays = [];
          let wd = 0;
          while (currentDate.isSameOrBefore(this.toDate)) {
            if (currentDate.day() !== 0 && currentDate.day() !== 6) {
              weekdays.push(currentDate.format("YYYY-MM-DD"));
              wd++;
            }
            currentDate.add(1, "days");
          }
          this.getByDays(wd - 1);
          this.dataStoreByDay();
          break;
        }
        case "Weekends": {
          let weekends = [];
          let we = 0;

          while (currentDate.isSameOrBefore(this.toDate)) {
            if (currentDate.day() === 0 || currentDate.day() === 6) {
              weekends.push(currentDate.format("YYYY-MM-DD"));
              we++;
            }
            currentDate.add(1, "days");
          }
          this.getByDays(we);
          this.dataStoreByDay();
          break;
        }
      }
    },
    /* onChange function for filtering by time which is second filter */
    onChangeByTime(event) {
      this.selectedFilterByTime = event.target.value;
      switch (this.selectedFilterByTime) {
        case "the number of days":
          this.dataStoreByTime();
          break;
        case "the number of hours":
          this.dataStoreByTime();
          break;
        case "the number of mins":
          this.dataStoreByTime();
          break;
        case "the number of seconds":
          this.dataStoreByTime();
          break;
      }
    },
  },
  computed: {
    /* validation to check the past dates */
    checkDates() {
      if (moment(this.fromDate).diff(moment(this.toDate), "days") >= 0) {
        return true;
      } else {
        return false;
      }
    },
    /* validation to check the dates are not empty for submit button */
    emptyDates() {
      return this.fromDate == "" || this.toDate == "" ? true : false;
    },
  },
};
</script>
