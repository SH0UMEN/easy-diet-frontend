<template>
<!--	<el-button v-for="product in products">{{ product.i18n.ru.title }}</el-button>-->
	<h1 v-if="product != null">{{ product.carbohydrate }}</h1>
</template>

<script lang="ts" setup>
import { ref, Ref, reactive } from 'vue';
import { useStore } from '@/store';
import ProductService from "@/services/product";
import IProduct from "@/models/product";
import { ElButton } from 'element-plus';
import 'element-plus/es/components/button/style/css';

const store = useStore();
const api = new ProductService();

const products = ref(new Array<IProduct>());
const product = ref<IProduct>();

setTimeout(() => {
	api.get(1001).then((data) => {
		product.value = data;
	})
}, 3000);

</script>