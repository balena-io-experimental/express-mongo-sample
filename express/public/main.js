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
            tempData.push((point.weather.main.temp-273.15).toFixed(2)); // Converting temperatue from Kelvin to Celcius
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



/*
{ "_id" : ObjectId("5d70cff2d4ad85c2ad9f147a"), "time" : ISODate("2019-09-05T09:05:54.607Z"), "weather" : { "coord" : { "lon" : -9.14, "lat" : 38.71 }, "weather" : [ { "id" : 800, "main" : "Clear", "description" : "clear sky", "icon" : "01d" } ], "base" : "stations", "main" : { "temp" : 294.52, "pressure" : 1016, "humidity" : 60, "temp_min" : 292.15, "temp_max" : 297.04 }, "visibility" : 10000, "wind" : { "speed" : 3.6, "deg" : 20 }, "clouds" : { "all" : 0 }, "dt" : 1567673969, "sys" : { "type" : 1, "id" : 6901, "message" : 0.0084, "country" : "PT", "sunrise" : 1567663740, "sunset" : 1567710132 }, "timezone" : 3600, "id" : 2267057, "name" : "Lisbon", "cod" : 200 } }
*/