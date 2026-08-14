import axios from "axios"

const api = axios.create({
    baseURL: 'https://fakestoreapi.com',
    timeout: 10000
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        // 成功的回應處理
        return response
    },
    (error) => {
        // 錯誤的回應處理
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log('請重新登入')
                    break
                case 403:
                    console.log('沒有權限')
                    break
                case 404:
                    console.log('找不到資源')
                    break
                case 500:
                    console.log('伺服器錯誤')
                    break
            }
        } else if (error.request) {
            console.log('網路連線失敗')
        }
        return Promise.reject(error)
    }
)


export default api