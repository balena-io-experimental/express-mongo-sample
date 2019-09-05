Vue.component("line-chart", {
  extends: VueChartJs.Line,
  mixins: [VueChartJs.mixins.reactiveProp],
  props: ["options"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
});

var vm = new Vue({
  el: "#app",
  data: function() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              distribution: "series",
              ticks: {
                source: "data",
                autoSkip: true
              },
              time: {
                unit: "minute",
                stepSize: 2,
                tooltipFormat: "lll",
                displayFormats: {
                  hour: "HH:mm:ss"
                }
              },
              display: true
            }
          ]
        }
      },
      datacollection: {
        labels: [
          "2019-09-05T09:01:54.607Z",
          "2019-09-05T09:03:54.607Z",
          "2019-09-05T09:04:54.607Z",
          "2019-09-05T09:05:54.607Z",
          "2019-09-05T09:06:54.607Z",
          "2019-09-05T09:11:54.607Z",
          "2019-09-05T09:12:54.607Z"
        ],
        datasets: [
          {
            label: "Temperature",
            backgroundColor: "#f87979",
            data: [30, 45, 10, 40, 39, 80, 40],
            fill: false
          }
        ]
      }
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData: function() {}
  }
});
