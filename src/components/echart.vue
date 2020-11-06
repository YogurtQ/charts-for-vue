<template>
  <div :id="id" class="echart" :style="{ width, height }" :ref="id" :data-responsive="responsive"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import echarts from 'echarts';
import _ from 'lodash';

@Component
export default class Echart extends Vue {
  instance!: echarts.ECharts; // echarts实例
  id: string = _.uniqueId('echart_'); // 对每个实例单独生成的id
  private _autoResize!: _.DebouncedFunc<() => void>;

  /**
   * Prop
   */
  @Prop({
    type: Object,
    default: () => ({})
  })
  private option!: object; // echarts图表配置项
  @Prop({
    type: Object,
    default: () => ({
      notMerge: false,
      lazyUpdate: false,
      silent: false // 是否阻止调用 setOption 时抛出事件
    })
  })
  private opts!: object; // echarts配置项额外参数
  @Prop({
    type: Object,
    default: undefined
  })
  private map: object | undefined; // 地图数据
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
      this.instance.setOption(option, this.opts);
      this.instance.resize();
    });
  }
  @Watch('width')
  private widthChanged() {
    if (this.responsive) {
      this.autoResize();
    } else {
      this.instance.resize();
    }
  }
  @Watch('height')
  private heightChanged() {
    if (this.responsive) {
      this.autoResize();
    } else {
      this.instance.resize();
    }
  }

  /**
   * Emit
   */
  @Emit('handleChartClick')
  handleChartClick(params: object) {
    return params;
  }
  @Emit('handleMouseover')
  handleMouseover(params: object) {
    return params;
  }
  @Emit('handleMouseout')
  handleMouseout(params: object) {
    return params;
  }

  /**
   * 初始化echarts实例并绑定事件，在父组件中可以通过instance获取实例并调用echarts方法
   */
  init(): void {
    if (this.instance) {
      this.instance.clear();
    } else {
      if (this.map) this.registerMap(this.map);
      this.instance = echarts.init(this.$refs[this.id] as HTMLDivElement);
      this.bindEvent();
    }
  }
  /**
   * 注册地图
   */
  registerMap(map: object) {
    if (Object.prototype.toString.call(map) !== '[object Object]') {
      return;
    }
    Object.keys(map).forEach(k => {
      echarts.registerMap(k, map[k as keyof typeof map]);
    });
  }
  /**
   * 改变图表尺寸
   */
  autoResize() {
    this.instance.resize();
  }
  /**
   * 绑定鼠标事件
   */
  bindEvent() {
    this.instance.on('click', this.handleChartClick);
    this.instance.on('mouseover', this.handleMouseover);
    this.instance.on('mouseout', this.handleMouseout);
  }

  /**
   * lifeCircle
   */
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.instance.setOption(this.option, this.opts);
      this._autoResize = _.debounce(() => this.autoResize(), 10);

      if (this.responsive) {
        this.autoResize();
        window.addEventListener('resize', this._autoResize);
      }
    });
  }
  beforeDestroy() {
    this.instance.dispose();
    if (this.responsive) {
      window.removeEventListener('resize', this._autoResize);
    }
  }
}
</script>
