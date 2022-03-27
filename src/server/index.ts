import axios from 'axios'
// 创建 axios 设置URL
const server = axios.create({
  baseURL: 'http://localhost:2100'
})
// 请求数据  并导出为 getCovidList
export const getCovidList = () => server.get('/api/covid/list').then(res => res.data)