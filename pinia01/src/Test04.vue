<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

const cartStore = useCartStore()
const { items, totalItems, totalMoney } = storeToRefs(cartStore)
const { addItem, removeItem, increaseAmount, decreaseAmount } = cartStore
const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)
const { login, logout } = userStore



</script>

<template>
    <div>
        <h1>測試購物車和登入登出</h1>
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
        <hr>
        <p>登入狀態: {{ isLogin ? '已登入' : '未登入' }}</p>
        <button @click="login({ name: 'Ben Chen' })">登入</button>
        <button @click="logout()">登出</button>
    </div>
</template>

<style scoped></style>