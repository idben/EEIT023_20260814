import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
    'user',
    () => {
        const isLogin = ref(false)
        const user = ref(null)

        function login(userData) {
            user.value = userData
            isLogin.value = true
        }

        function logout() {
            user.value = null
            isLogin.value = false
        }

        return { isLogin, user, login, logout }
    }
)