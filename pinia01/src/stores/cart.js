import { ref, computed, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

export const useCartStore = defineStore(
    'cart',
    () => {
        const userStore = useUserStore()

        const savedCart = localStorage.getItem('cart0001')
        const items = ref(savedCart ? JSON.parse(savedCart) : [])

        watch(items,
            (newItems) => {
                localStorage.setItem('cart0001', JSON.stringify(newItems))
            },
            { deep: true }
        )

        const discount = computed(() => userStore.isLogin ? 0.8 : 1)

        const totalItems = computed(() =>
            items.value.reduce((sum, item) => sum + item.quantity, 0)
        )

        const totalMoney = computed(() =>
            items.value.reduce((sum, item) => sum + item.quantity * item.price, 0)
        )

        const totalMoney2 = computed(() => {
            const subtotal = items.value.reduce((sum, item) => sum + item.quantity * item.price, 0)
            return subtotal * discount.value
        })

        const isEmpty = computed(() => items.value.length == 0)

        function addItem(product) {
            // 判斷是否已存在於購物車
            const existing = items.value.find((item) => item.id == product.id)
            if (existing) {
                existing.quantity++
            } else {
                items.value.push({ ...product, quantity: 1 })
            }
        }

        function removeItem(productId) {
            const index = items.value.findIndex(it => it.id == productId)
            if (index > -1) items.value.splice(index, 1)
        }

        function increaseAmount(productId) {
            const item = items.value.find(it => it.id == productId)
            if (item) item.quantity++
        }

        function decreaseAmount(productId) {
            const item = items.value.find(it => it.id == productId)
            if (item && item.quantity > 1) item.quantity--
        }

        function clearCart() {
            items.value = []
        }

        return {
            items,
            discount,
            totalItems,
            totalMoney,
            totalMoney2,
            isEmpty,
            addItem,
            removeItem,
            increaseAmount,
            decreaseAmount,
            clearCart
        }
    }
)