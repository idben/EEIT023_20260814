<script setup>
// 匯入 Vue 功能與 Axios
import { ref, onMounted } from 'vue'
import { getProducts, getProduct } from '@/api/products'

// 宣告響應式狀態
const products = ref([])
const selectedProduct = ref(null)

// 
const fetchProducts = async () => {
    products.value = await getProducts()
}

const fetchProduct = async (id) => {
    selectedProduct.value = await getProduct(id)
}

// 元件掛載後呼叫 API
onMounted(() => {
    fetchProducts()
})
</script>

<template>
    <div>
        <h1>axios 建立共同實例的操作</h1>
        <!-- 標題與商品列表 -->
        <div class="container1">
            <ul class="list1">
                <li @click="fetchProduct(product.id)" v-for="product in products" :key="product.id">
                    <img class="img100" :src="product.image" alt="">
                    <br>
                    {{ product.title }} - ${{ product.price }}
                </li>
            </ul>
            <div v-if="selectedProduct" class="img-big">
                <!-- 放大圖 -->
                <img :src="selectedProduct.image" alt="">
            </div>
        </div>

    </div>

</template>

<style scoped>
.container1 {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.list1 {
    list-style-type: none;
    padding: 0;
    width: 200px;
}

.img-big {
    flex: 1;
}

.img100 {
    width: 100px;
    height: 100px;
    object-fit: cover;
}
</style>