import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore(
    'cart',
    () => {
        const items = ref([])

        const totalItems = computed(() =>
            items.value.reduce((sum, item) => sum + item.quantity, 0)
        )

        const totalMoney = computed(() =>
            items.value.reduce((sum, item) => sum + item.quantity * item.price, 0)
        )

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
            totalItems,
            totalMoney,
            isEmpty,
            addItem,
            removeItem,
            increaseAmount,
            decreaseAmount,
            clearCart
        }
    }
)