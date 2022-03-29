import { defineStore } from 'pinia'
import { getCovidList } from '../server'
import type { RootObject, Children, ChinaAdd, ChinaTotal, StatisGradeCityDetail } from './type'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    list: <RootObject>{},// 创建疫情列表数据
    item: <Children[]>[],// 创建表格数据
    chinaAdd: <ChinaAdd>{},// 创建中国新增
    chinaTotal: <ChinaTotal>{},// 创建中国总数
    cityDetail: <StatisGradeCityDetail[]>[]// 创建城市详情
  }),
  actions: {
    // 获取疫情列表的方法
    async getList() {
      const result = await getCovidList()
      this.list = result
      this.chinaAdd = this.list.diseaseh5Shelf.chinaAdd
      this.chinaTotal = this.list.diseaseh5Shelf.chinaTotal
      this.cityDetail = this.list.statisGradeCityDetail.slice(0, 10)
    }
  }
})
