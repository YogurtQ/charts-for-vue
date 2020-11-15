<template>
  <div :id="id" class="highchart" :style="{ width, height }" :ref="id" :data-responsive="responsive"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import _ from 'lodash';

Highcharts3D(Highcharts);

@Component
export default class Highchart extends Vue {
  instance!: Highcharts.Chart; // highcharts实例
  id: string = _.uniqueId('highchart_'); // 对每个实例单独生成的id
  private _autoResize!: _.DebouncedFunc<() => void>;

  /**
   * Prop
   */
  @Prop({
    type: Object,
    default: () => ({})
  })
  private option!: object; // highcharts图表配置项
  @Prop({
    type: Object,
    default: () => ({
      credits: {
        enabled: false
      }
    })
  })
  private opts!: object; // highcharts图表全局配置项
  @Prop({
    type: Boolean,
    default: true
  })
  private responsive!: boolean; // 是否响应布局变化
  @Prop({
    type: String,
    default: '100%'
  })
  private width!: string;
  @Prop({
    type: String,
    default: '100%'
  })
  private height!: string;

  /**
   * Watch
   */
  @Watch('responsive')
  private responsiveChanged(responsive: string) {
    if (responsive) {
      this.autoResize();
      window.addEventListener('resize', this._autoResize);
    } else {
      window.removeEventListener('resize', this._autoResize);
    }
  }
  @Watch('option')
  private optionChanged(option: object) {
    this.$nextTick(() => {
      this.instance.update(option);
    });
  }
  @Watch('width')
  private widthChanged() {
    if (this.responsive) {
      this.autoResize();
    } else {
      this.instance.reflow();
    }
  }
  @Watch('height')
  private heightChanged() {
    if (this.responsive) {
      this.autoResize();
    } else {
      this.instance.reflow();
    }
  }

  /**
   * 初始化highcharts实例并绑定事件，在父组件中可以通过instance获取实例并调用highcharts方法
   */
  init(): void {
    if (this.instance) {
      this.instance.destroy();
    } else {
      // 设置全局配置项
      Highcharts.setOptions(this.opts);
      // 设置图表配置项
      this.instance = Highcharts.chart(this.id, this.option);
    }
  }
  /**
   * 改变图表尺寸
   */
  autoResize() {
    this.instance.reflow();
  }

  /**
   * lifeCircle
   */
  mounted() {
    this.$nextTick(() => {
      this.init();
      this._autoResize = _.debounce(() => this.autoResize(), 10);

      if (this.responsive) {
        this.autoResize();
        window.addEventListener('resize', this._autoResize);
      }
    });
  }
  beforeDestroy() {
    this.instance.destroy();
    if (this.responsive) {
      window.removeEventListener('resize', this._autoResize);
    }
  }
}
</script>
