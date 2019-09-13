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
      refreshing: false,
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
          ],
          yAxes: [
            {
              id: "Temperature",
              labelString: "Temperature",
              type: "linear",
              position: "left",
              ticks: {
                max: 50,
                min: 0,
                callback: function(value, index, values) {
                  return value + "°C";
                }
              }
            },
            {
              id: "Humidity",
              labelString: "Humidity",
              type: "linear",
              position: "right",
              ticks: {
                max: 100,
                min: 0,
                callback: function(value, index, values) {
                  return value + "%";
                }
              }
            }
          ]
        }
      },
      datacollection: {},
      cityName: "",
      cityLat: "",
      cityLong: "",
      currentTime: null
    };
  },
  created() {
    this.loadData();
  },
  mounted() {
    this.refresh();
  },
  methods: {
    loadData() {
      console.log("Updating content");
      fetch("/data")
        .then(res => {
          return res.json();
        })
        .then(data => {
          let labels = [];
          let tempData = [];
          let humidData = [];

          data.map(point => {
            labels.push(point.time);
            tempData.push(point.weather.currently.temperature.toFixed(2));
            humidData.push(point.weather.currently.humidity.toFixed(2) * 100);
          });

          /* Get last data points */
          this.cityName = data[data.length - 1].weather.timezone;
          this.cityLat = data[data.length - 1].weather.latitude;
          this.cityLong = data[data.length - 1].weather.longitude;
          this.currentTime = data[data.length - 1].time;

          this.datacollection = {
            labels: labels,
            datasets: [
              {
                label: "Temperature",
                yAxisID: "Temperature",
                backgroundColor: "#f87979",
                data: tempData,
                fill: false
              },
              {
                label: "Humidity",
                yAxisID: "Humidity",
                backgroundColor: "#348ceb",
                data: humidData,
                fill: false
              }
            ]
          };
        });
    },
    refresh() {
      /* update data every 2 minutes */

      setInterval(() => {
        this.refreshing = true;
        this.loadData();
        setTimeout(() => {
          this.refreshing = false;
        }, 3000);
      }, 60000);
    }
  }
});
