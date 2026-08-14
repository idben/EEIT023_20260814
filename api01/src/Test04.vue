<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { getProducts, getProductsByCategory, getCategories } from '@/api/products'
import axios from 'axios'

const products = ref([])
const categories = ref([])
const selectedCategory = ref('')
const loading = ref(false)
const error = ref(null)
let controller = null

const fetchProducts = async function () {
    // 取消上一個未完成的請求
    if (controller) {
        controller.abort()
    }
    loading.value = true
    error.value = null

    // 建立新的 AbortController
    controller = new AbortController()
    try {
        // try: 發送請求 (帶 signal)
        if (selectedCategory.value) {
            products.value = await getProductsByCategory(selectedCategory.value, controller)
        } else {
            products.value = await getProducts(controller)
        }
    } catch (err) {
        // catch: 判斷是不是取消造成的錯誤
        if (axios.isCancel(err)) {
            return
        }
        error.value = err.message || '戴入錯誤'
    } finally {
        // finally: 關閉 loading
        loading.value = false
    }
}

const fetchCategories = async () => {
    try {
        categories.value = await getCategories()
    } catch (err) {
        error.value = '載入分類失敗'
    }
}

watch(selectedCategory, () => fetchProducts())

onMounted(() => {
    fetchProducts()
    fetchCategories()
})

onUnmounted(() => {
    if (controller) {
        controller.abort()
    }
})
</script>

<template>
    <div class="container py-3">
        <div class="d-flex align-items-start">
            <h1 class="fw-bold">商品列表</h1>
            <!-- 分類下拉式選單 -->
            <select v-model="selectedCategory" class="form-select w-auto ms-auto">
                <option value="">全部分類</option>
                <option v-for="category in categories" :value="category" :key="category">{{ category }}</option>
            </select>
        </div>

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
                    <div class="badge text-bg-warning position-absolute top-0 end-0 p1">electronics</div>
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

.p1 {
    right: 5px !important;
    top: 5px !important;
}
</style>