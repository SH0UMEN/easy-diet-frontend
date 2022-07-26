<template>
<!--<el-button v-for="product in products">{{ product.i18n.ru.title }}</el-button>-->
	<h1>{{ user.name }}</h1>
	<div v-for="product in products">{{ product.i18n.en.title }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import useStore from '@/store/users';
import { AuthService } from "@/services/auth";
import Product from "@/models/product";
import { ElButton } from 'element-plus';
import 'element-plus/es/components/button/style/css';

const store = useStore();
const products = ref(new Array<Product>());
const { user } = storeToRefs(store);

new AuthService().me().then((data) => {
	console.log(data);
});
//
// api.get().then((data) => {
// 	products.value = products.value.concat(data);
// });

</script>