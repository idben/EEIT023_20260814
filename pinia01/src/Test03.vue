<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
// 只有 state 和 getter 可以用 storeToRefs 處理後解包
const { items, totalItems, totalMoney } = storeToRefs(cartStore)
const { addItem, removeItem, increaseAmount, decreaseAmount } = cartStore

// 物件解包
const user = {
    name: 'Ben',
    email: 'ben@ben.com'
}
// const name = user.name
// const email = user.email
const { name, email } = user

</script>

<template>
    <div>
        <h1>測試購物車</h1>
        <!-- 狀態顯示：商品數與總金額 -->
        <p>購物車商品總數量: {{ totalItems }}</p>
        <p>總金額: NT {{ totalMoney }}</p>
        <!-- 操作按鈕：加入商品、清空 -->
        <button @click="addItem({ id: 2, name: '香蕉', price: 30 })">香蕉</button>
        <button @click="addItem({ id: 1, name: '香蕉', price: 50 })">蘋果</button>
        <!-- 商品清單：列出購物車內容 -->
        <ul>
            <li v-for="item in items" :key="item.id">
                {{ item.name }} x {{ item.quantity }} = {{ item.quantity * item.price }}
                <button @click="increaseAmount(item.id)">+</button>
                <button @click="decreaseAmount(item.id)">-</button>
                <button @click="removeItem(item.id)">移除</button>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>