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
      datacollection: {}
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      fetch("/data")
        .then(res => {
          return res.json();
        })
        .then(data => {
          // console.log(data);

          let labels = [];
          let tempData = [];

          data.map(point => {
            labels.push(point.time);
            tempData.push(point.weather.main.temp);
          });

          this.datacollection = {
            labels: labels,
            datasets: [
              {
                label: "Temperature",
                backgroundColor: "#f87979",
                data: tempData,
                fill: false
              }
            ]
          };
        });
    }
  }
});
