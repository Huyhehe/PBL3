<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    revenue: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Thu nhập",
            backgroundColor: "#36AE7C",
            borderColor: "#14C38E",
            data: [],
          },
          {
            label: "Chi tiêu",
            backgroundColor: "#D61C4E",
            borderColor: "#F87474",
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    // console.log(this.chartData["labels"]);
    // console.log(this.chartData["datasets"][0].data);
  },
  watch: {
    revenue() {
      this.chartData["datasets"][0].data.length = 0;
      this.chartData["datasets"][1].data.length = 0;
      this.chartData["labels"].length = 0;
      this.revenue.map((r) => {
        this.chartData["labels"].push(r.date.slice(0, 10));
        this.chartData["datasets"][0].data.push(r.moneyIn);
        this.chartData["datasets"][1].data.push(r.moneyOut);
      });
    },
  },
};
</script>
