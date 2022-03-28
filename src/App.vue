<template>
  <div class="container" :style="{ background: `url(${bg})` }">
    <div class="container-left"></div>
    <div class="container-center" id="china"></div>
    <div class="container-right"></div>
  </div>
</template>

<script setup lang="ts">
import bg from "./assets/bg.jpg"; // 导入背景图
import { useCounterStore } from "./stores/counter"; // 导入疫情数据模块

/**
 * 添加echarts需要一个dom元素
 * dom元素要在onMounted生命周期当中获取
 */
import { onMounted } from "vue"; // 导入 vue 生命周期
import * as echarts from "echarts"; // 导入 echarts  把所有api导出成一个对象（echarts 5）
import "./assets/china.js"; // 导入地图 china.js
import { geoCoordMap } from "./assets/geoMap";

const store = useCounterStore();
// 挂载地图
onMounted(async () => {
  await store.getList(); //调用方法获取疫情数据
  const city = store.list.diseaseh5Shelf.areaTree[0].children;
  const data = city.map((v) => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
    };
  });
  /**
   * 挂载的时候往china元素中init
   * 这个as实际什么都没干，它就是一个类型断言。
   * 告诉编译器，我认为这个对象是 HTMLElement类型的，你别瞎操心了。
   * 要不然由于类型不对，编译器会阻止你赋值，编译的时候直接报错。
   */
  const charts = echarts.init(document.querySelector("#china") as HTMLElement);

  // setOption(地图的配置)
  charts.setOption({
    // backgroundColor: "black", // 背景黑色
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "120%",
      itemStyle: {
        //normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        //},
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            //normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            //},
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        selectedMode: "multiple",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "120%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          //normal: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
          //},
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: "pin",
        symbolSize: [45, 45],
        label: {
          //normal: {
          show: true,
          color: "#fff",
          // 格式化数据的函数
          formatter(value: any) {
            return value.data.value[2]; //然后return你需要的legend格式即可
          },
          //},
        },
        itemStyle: {
          //normal: {
          color: "#E4393C", //标志颜色
          //},
        },
        data: data,
      },
    ],
  });
});
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
.container {
  height: 100%;
  display: flex;
  overflow: hidden;
  &-left {
    width: 400px;
  }
  &-center {
    flex: 1;
  }
  &-right {
    width: 400px;
  }
}
</style>
