import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import smash from '../../helpers/data/smash';


const buildSingleEventChart = (eventId) => {
  smash.getCompleteEvent(eventId).then((singleEvent) => {
    const chart = am4core.create('chartDiv', am4charts.XYChart);
    console.error('singleEvent', singleEvent);
    chart.marginRight = 400;

    // Add data
    chart.data = [{
      collection: 'Food',
      cost: singleEvent.foodTotalAmount,
    },
    {
      collection: 'Souvenirs',
      cost: singleEvent.souvenirTotalAmount,
    },
    {
      collection: 'Shows',
      cost: singleEvent.showTotalAmount,
    },
    {
      collection: 'Staff',
      cost: singleEvent.staffTotalAmount,
    },
    {
      collection: 'Animals',
      cost: singleEvent.animalsTotalAmount,
    },
    ];

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'collection';
    categoryAxis.title.text = 'Collections';

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Total Cost';

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'cost';
    series.dataFields.categoryX = 'collection';
    series.name = 'Cost';
    series.tooltipText = '{name}: [bold]{valueY}[/]';
    series.columns.template.fill = am4core.color('#670b1a');

    chart.cursor = new am4charts.XYCursor();
  })
    .catch((err) => console.error('failed event', err));
};


export default { buildSingleEventChart };
