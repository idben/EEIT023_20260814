<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/test04">商品列表</RouterLink> |
    <RouterLink to="/about">關於我</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped></style>