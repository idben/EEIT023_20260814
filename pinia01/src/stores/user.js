import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
    'user',
    () => {
        const savedUser = localStorage.getItem('user0001')
        const user = ref(savedUser ? JSON.parse(savedUser) : null)
        const isLogin = ref(user.value ? true : false)

        function login(userData) {
            user.value = userData
            isLogin.value = true
            localStorage.setItem('user0001', JSON.stringify(userData))
        }

        function logout() {
            user.value = null
            isLogin.value = false
            localStorage.removeItem('user0001')
        }

        return { isLogin, user, login, logout }
    }
)