import { defineStore } from 'pinia'
import { getCovidList } from '../server'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    list: {}//创建疫情列表数据
  }),
  actions: {
    // 获取疫情列表的方法
    async getList() {
      const result = await getCovidList()
      console.log(result);
    }
  }
})
