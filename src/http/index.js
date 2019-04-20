/* 导出一个已经配置好的axios */
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
/* 导出 */
export default axios
