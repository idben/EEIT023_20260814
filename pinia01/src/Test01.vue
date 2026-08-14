<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
    <div>
        <h1>測試購物車</h1>
        <p>商品數量: {{ cartStore.totalItems }}</p>
        <p>總金額: {{ cartStore.totalMoney }}</p>
        <p>是否為空: {{ cartStore.isEmpty }}</p>

        <button @click="cartStore.addItem({ id: 1, name: '蘋果', price: 50 })">加入商品</button>
        <button @click="cartStore.clearCart()">清空</button>

        <ul>
            <li v-for="item in cartStore.items" :key="item.id">
                {{ item.name }} × {{ item.quantity }} = {{ item.price * item.quantity }}
            </li>
        </ul>
    </div>
</template>

<style scoped></style>