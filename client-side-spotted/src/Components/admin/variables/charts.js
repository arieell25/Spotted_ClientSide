/* eslint-disable no-unused-vars */
// ##############################
// // // javascript library for creating charts
// #############################
var Chartist = require("chartist");
var tooltip = require("chartist-plugin-tooltips");
var ctAxisTitle = require("chartist-plugin-axistitle");
// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Identified Encounters per month
// #############################

const EncountersIdentChart = {
  data: {
    labels: [],
    series: [],
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 35, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  // for animation
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ##############################
// // // Home range of Encounters
// #############################

const homeRangeChart = {
  data: {
    labels: [],
    series: [],
  },
  options: {
    axisX: {
      showGrid: false,
    },
    low: 0,
    high: 20,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0,
    },
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ##############################
// // // Encounters reports per month
// #############################

const EncounterReportsChart = {
  data: {
    labels: [],
    series: [],
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 30,
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ##############################
// // // Ident encounters photos sides statistics chart
// #############################

const PhotosSidesChart = {
  data: {
    labels: [],
    series: [],
  },
  options: {
    axisX: {
      showGrid: false,
    },
    low: 0,
    high: 5,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0,
    },
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ####################################
// // // Home range of Ident Encounter
// ###################################

const IdentEnocunterHomeRangeChart = {
  data: {
    labels: [],
    series: [],
  },
  options: {
    height: "300px",
    showLine: false,
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 5,
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 20,
      left: 10,
    },
    plugins: [
      Chartist.plugins.tooltip(),
      Chartist.plugins.ctAxisTitle({
        axisX: {
          axisTitle: "Site ",
          axisClass: "ct-axis-title",
          offset: {
            x: 0,
            y: 50,
          },
          textAnchor: "middle",
          color: "white",
        },
        axisY: {
          axisTitle: "Reports",
          axisClass: "ct-axis-title",
          offset: {
            x: 0,
            y: 0,
          },
          textAnchor: "middle",
          textColor: "white",
          flipTitle: false,
        },
      }),
    ],
  },

  // for animation
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

module.exports = {
  EncountersIdentChart,
  homeRangeChart,
  EncounterReportsChart,
  PhotosSidesChart,
  IdentEnocunterHomeRangeChart,
};
