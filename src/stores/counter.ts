import { defineStore } from 'pinia'
import { getCovidList } from '../server'
import type { RootObject, Children } from './type'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    list: <RootObject>{},// 创建疫情列表数据
    item: <Children[]>{}// 创建表格数据
  }),
  actions: {
    // 获取疫情列表的方法
    async getList() {
      const result = await getCovidList()
      this.list = result
      // console.log(result);
    }
  }
})
