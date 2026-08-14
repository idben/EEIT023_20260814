<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
    <div>
        <h1>測試購物車</h1>
        <!-- 狀態顯示：商品數與總金額 -->
        <p>購物車商品總數量: {{ cartStore.totalItems }}</p>
        <p>總金額: NT {{ cartStore.totalMoney }}</p>
        <!-- 操作按鈕：加入商品、清空 -->
        <button @click="cartStore.addItem({ id: 2, name: '香蕉', price: 30 })">香蕉</button>
        <button @click="cartStore.addItem({ id: 1, name: '香蕉', price: 50 })">蘋果</button>
        <!-- 商品清單：列出購物車內容 -->
        <ul>
            <li v-for="item in cartStore.items" :key="item.id">
                {{ item.name }} x {{ item.quantity }} = {{ item.quantity * item.price }}
                <button @click="cartStore.increaseAmount(item.id)">+</button>
                <button @click="cartStore.decreaseAmount(item.id)">-</button>
                <button @click="cartStore.removeItem(item.id)">移除</button>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>