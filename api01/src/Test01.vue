<script setup>
// 匯入 Vue 功能與 Axios
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 宣告響應式狀態
const products = ref([])

// 定義取得商品的函式
const fetchProducts = async () => {
    const response = await axios.get('https://fakestoreapi.com/products')
    products.value = await response.data
    console.log(products.value);
}

// 元件掛載後呼叫 API
onMounted(() => {
    fetchProducts()
})
</script>

<template>
    <h1>呼叫 API</h1>
    <!-- 標題與商品列表 -->
    <ul>
        <li v-for="product in products" :key="product.id">
            <img class="img100" :src="product.image" alt="">
            <br>
            {{ product.title }} - ${{ product.price }}
        </li>
    </ul>
</template>

<style scoped>
.img100 {
    width: 100px;
    height: 100px;
    object-fit: cover;
}
</style>