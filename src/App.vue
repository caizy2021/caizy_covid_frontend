<template>
  <div class="container" :style="{ background: `url(${bg})` }">
    <div class="container-left"></div>
    <div class="container-center" id="china"></div>
    <div class="container-right" style="color: white">
      <table class="table" cellspacing="0" border="1">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group
          enter-active-class="animate__animated animate__fadeInRight"
          tag="tbody"
        >
          <tr v-for="item in store.item" :key="item.name">
            <td align="center">{{ item.name }}</td>
            <td align="center">{{ item.today.confirm }}</td>
            <td align="center">{{ item.total.confirm }}</td>
            <td align="center">{{ item.total.heal }}</td>
            <td align="center">{{ item.total.dead }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
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
import { geoCoordMap } from "./assets/geoMap"; // 导入经纬度
import "animate.css"; // 导入动画 animate.css

const store = useCounterStore(); // 调用方法 store
/**
 * 页面挂载时
 */
onMounted(async () => {
  await store.getList(); //调用 store 获取疫情数据
  initCharts(); // 插入图表
});
/**
 * 封装函数 插入图表
 */
const initCharts = () => {
  const city = store.list.diseaseh5Shelf.areaTree[0].children;
  store.item = city[4].children;
  console.log(city);
  const data = city.map((v) => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children,
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

  // 封装方法 on  监听点击事件 click
  charts.on("click", (e: any) => {
    // console.log(e);
    store.item = e.data.children;
  });
};
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
.table {
  background: #2e2e2e;
  width: 100%;
  tr {
    th {
      padding: 5px;
      white-space: nowrap; // 不能换行
    }
    td {
      padding: 5px 10px;
      white-space: nowrap;
      width: 100px;
    }
  }
}
</style>
