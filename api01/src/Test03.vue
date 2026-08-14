<script setup>
import { ref, onMounted } from 'vue'
import { getProducts } from '@/api/products'

const products = ref([])
const loading = ref(false)
const error = ref(null)

const fetchProducts = async function () {
    loading.value = true
    error.value = null

    try {
        products.value = await getProducts()
    } catch (err) {
        error.value = err.message || '戴入錯誤'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchProducts()
})
</script>

<template>
    <div class="container py-3">
        <h1 class="fw-bold">商品列表</h1>
        <!-- 載入中 -->
        <div v-if="loading" class="display-1 text-center">載入中...</div>
        <!-- 錯誤區塊 -->
        <div v-else-if="error" class="text-center">
            <p class="display-1 text-danger">{{ error }}</p>
            <button class="btn btn-danger">重試</button>
        </div>
        <!-- 商品卡片 -->
        <div v-else class="row g-2 row-cols-1 row-cols-sm-2 row-cols-md-3">
            <div class="col" v-for="product in products" :key="product.id">
                <div class="card h350px">
                    <img class="card-img-top h200px object-fit-contain" :src="product.image" alt="">
                    <div class="card-body">
                        <div>{{ product.title }}</div>
                        <div>{{ product.price }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.h200px {
    height: 200px;
}

.h350px {
    height: 350px;
}
</style>