<template>
  <div class="stack-bar">
    <a-row>
      <a-col :span="12">Echarts</a-col>
      <a-col :span="12">Highcharts</a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <div class="chart-container">
          <Echart :option="echartOption"></Echart>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="chart-container">
          <Highchart :option="highchartOption"></Highchart>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

interface ChartData {
  legend: Array<number | string>;
  category: Array<number | string>;
  series: Array<Array<number | string>>;
}

@Component
export default class StackBar extends Vue {
  private data: ChartData = {
    legend: ['吃喝玩乐', '衣物日用', '其他'],
    category: ['1月', '2月', '3月', '4月', '5月', '6月'],
    series: [
      [1420, 1500, 1650, 1360, 1540, 1230],
      [900, 450, 420, 800, 560, 320],
      [100, 120, 200, 130, 80, 150]
    ]
  };

  get echartOption() {
    const { legend, category, series } = this.data;

    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: legend
      },
      xAxis: {
        type: 'category',
        data: category
      },
      yAxis: {
        type: 'value'
      },
      series: series.map((data, i) => ({
        name: legend[i],
        type: 'bar',
        stack: true,
        data
      }))
    };
  }

  get highchartOption() {
    const { legend, category, series } = this.data;

    return {
      chart: {
        type: 'column'
      },
      tooltip: {
        shared: true
      },
      xAxis: {
        categories: category,
        crosshair: true
      },
      series: series.map((data, i) => ({
        name: legend[i],
        stacking: 'normal',
        // stack: 0, 若设置stack，会将相同stack值的柱子堆叠在一起
        data
      }))
    };
  }
}
</script>
